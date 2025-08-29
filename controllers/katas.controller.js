import { fetchAllKatas, fetchKataById } from "../models/katas.model.js";

export const getAllKatas = (req, res, next) => {
  fetchAllKatas()
    .then((katas) => {
      res.status(200).send({ katas });
    })
    .catch(next);
};

export const getKataById = (req, res, next) => {
  const { kata_id } = req.params;
  fetchKataById(kata_id)
    .then((kata) => {
      res.status(200).send(kata);
    })
    .catch(next);
};
