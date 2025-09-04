import {
  fetchAllKatas,
  fetchKataById,
  insertKata,
  insertKataTags,
  selectKataTags,
  selectKataHint,
  selectKataNote,
  findKataByTitle,
  findKataByInitialCode,
} from "../models/katas.model.js";

export const getAllKatas = async (req, res, next) => {
  try {
    const { tag } = req.query;
    const katas = await fetchAllKatas(tag);

    if (katas === null) {
      return res.status(404).json({ msg: "Tag not found" });
    }

    res.status(200).json({ katas });
  } catch (err) {
    next(err);
  }
};

export const getKataById = async (req, res, next) => {
  try {
    const kata_id = Number(req.params.kata_id);

    if (isNaN(kata_id) || kata_id <= 0) {
      return res.status(400).send({ msg: "400 Bad Request" });
    }

    const kata = await fetchKataById(kata_id);
    res.status(200).send({ kata });
  } catch (err) {
    if (err.status) return res.status(err.status).send({ msg: err.msg });
    next(err);
  }
};

export const getKataHint = async (req, res, next) => {
  try {
    const kata_id = Number(req.params.kata_id);

    if (isNaN(kata_id) || kata_id <= 0) {
      return res.status(400).json({ msg: "400 Bad Request" });
    }

    const result = await selectKataHint(kata_id);

    if (!result) {
      return res.status(404).json({ msg: "Hint not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getKataNote = async (req, res, next) => {
  try {
    const kata_id = Number(req.params.kata_id);

    if (!Number.isInteger(kata_id) || kata_id <= 0) {
      return res.status(400).json({ msg: "400 Bad Request" });
    }

    const note = await selectKataNote(kata_id);

    if (!note || !note.note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

export const getKataTags = async (req, res, next) => {
  try {
    const kata_id = Number(req.params.kata_id);

    if (isNaN(kata_id) || kata_id <= 0) {
      return res.status(400).json({ msg: "400 Bad Request" });
    }

    const result = await selectKataTags(kata_id);

    if (!result) {
      return res.status(404).json({ msg: "Tags not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const postKata = async (req, res, next) => {
  try {
    const { title, description, initial_code, solution_code, difficulty, tags } =
      req.body;

    if (
      !title ||
      !description ||
      !initial_code ||
      !solution_code ||
      !["easy", "medium", "hard"].includes(difficulty)
    ) {
      return res
        .status(400)
        .send({ msg: "400 Bad Request - invalid or missing fields" });
    }

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res
        .status(400)
        .send({ msg: "400 Bad Request - invalid or missing fields" });
    }

    const existing = await findKataByTitle(title);
    if (existing) {
      return res
        .status(409)
        .send({ msg: "409 Conflict - kata already exists" });
    }

    const existingCode = await findKataByInitialCode(initial_code);
    if (existingCode) {
      return res
        .status(409)
        .send({ msg: "409 Conflict - code already exists" });
    }

    const newKata = await insertKata({
      title,
      description,
      initial_code,
      solution_code,
      difficulty,
    });

    if (!newKata) return;

    await insertKataTags(newKata.kata_id, tags);

    newKata.tags = tags;
    res.status(201).json({ kata: newKata });
  } catch (err) {
    if (err.status && err.msg) {
      return res.status(err.status).send({ msg: err.msg });
    }
    console.error("POST /api/katas error:", err);
    next(err);
  }
};