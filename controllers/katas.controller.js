import { fetchAllKatas, fetchKataById } from "../models/katas.model.js";

export const getAllKatas = (req, res, next) => {
  fetchAllKatas()
    .then((katas) => {
      res.status(200).send({ katas });
    })
    .catch(next);
};

export default function getKataById(req, res) {
  fetchKataById()
    .then((kata) => {
      res.status(200).send(kata);
    })
    .catch((err) => {
      next(err);
    });
}
