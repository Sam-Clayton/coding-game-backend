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

export const getAllKatas = (req, res, next) => {
  const { tag } = req.query;

  fetchAllKatas(tag)
    .then((katas) => {
      if (katas === null) {
        return res.status(404).json({ msg: "Tag not found" });
      }
      res.status(200).json({ katas });
    })
    .catch(next);
};

export const getKataById = (req, res, next) => {
  const kata_id = Number(req.params.kata_id);

  if (isNaN(kata_id) || kata_id <= 0) {
    return res.status(400).send({ msg: "400 Bad Request" });
  }

  fetchKataById(kata_id)
    .then((kata) => {
      res.status(200).send({ kata });
    })
    .catch((err) => {
      if (err.status) return res.status(err.status).send({ msg: err.msg });
      next(err);
    });
};

export const getKataHint = (req, res, next) => {
  const kata_id = Number(req.params.kata_id);
  if (isNaN(kata_id) || kata_id <= 0) {
    return res.status(400).json({ msg: "400 Bad Request" });
  }

  selectKataHint(kata_id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ msg: "Hint not found" });
      }
      res.status(200).json(result);
    })
    .catch((err) => next(err));
};

export const getKataNote = (req, res) => {
  const kata_id = Number(req.params.kata_id);

  if (!Number.isInteger(kata_id) || kata_id <= 0) {
    return res.status(400).json({ msg: "400 Bad Request" });
  }

  selectKataNote(kata_id)
    .then((note) => {
      if (!note || !note.note) {
        return res.status(404).json({ msg: "Note not found" });
      }
      res.status(200).json(note);
    })
     .catch((err) => next(err));
};

export const getKataTags = (req, res, next) => {
  const kata_id = Number(req.params.kata_id);

  if (isNaN(kata_id) || kata_id <= 0) {
    return res.status(400).json({ msg: "400 Bad Request" });
  }

  selectKataTags(kata_id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ msg: "Tags not found" });
      }
      res.status(200).json(result);
    })
    .catch((err) => next(err));
};

export const postKata = (req, res, next) => {
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

  findKataByTitle(title)
    .then((existing) => {
      if (existing)
        return Promise.reject({
          status: 409,
          msg: "409 Conflict - kata already exists",
        });
      return findKataByInitialCode(initial_code);
    })
    .then((existingCode) => {
      if (existingCode)
        return Promise.reject({
          status: 409,
          msg: "409 Conflict - code already exists",
        });
      return insertKata({
        title,
        description,
        initial_code,
        solution_code,
        difficulty,
      });
    })
    .then((newKata) => {
      if (!newKata) return;

      return insertKataTags(newKata.kata_id, tags).then(() => {
        newKata.tags = tags;
        res.status(201).json({ kata: newKata });
      });
    })
    .catch((err) => {
      if (err.status && err.msg) {
        return res.status(err.status).send({ msg: err.msg });
      }
      console.error("POST /api/katas error:", err);
      next(err);
    });
};
