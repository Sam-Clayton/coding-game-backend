import { fetchAllKatas, fetchKataById, insertKata} from "../models/katas.model.js";

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

export const postKata = (req, res, next) => {
  const { title, description, initial_code, solution_code, difficulty } = req.body;

  if (
    !title ||
    !description ||
    !initial_code ||
    !solution_code ||
    !["easy", "medium", "hard"].includes(difficulty)
  ) {
    return res.status(400).send({ msg: "400 Bad Request - invalid or missing fields" });
  }

  insertKata({ title, description, initial_code, solution_code, difficulty })
    .then((newKata) => {
      res.status(201).send({ kata: newKata });
    })
    .catch(next);
};
