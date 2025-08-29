import { fetchAllKatas, fetchKataById } from "../models/katas.model.js";

export const getAllKatas = (req, res, next) => {
  fetchAllKatas()
    .then((katas) => {
      res.status(200).send({ katas });
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
