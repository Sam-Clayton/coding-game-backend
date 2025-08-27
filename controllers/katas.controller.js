import { fetchKataById } from "../models/katas.model.js";

/*export const getAllKatas = (req, res) => {
  fetchAllKatas()
  .then((kata) => {
      res.status(200);
      res.json(kata);
    })
    .catch((err) => {
      next(err);
    });
}
    */

export const getKataById = (req, res) => {
  fetchKataById()
    .then((kata) => {
      res.status(200);
      res.json(kata);
    })
    .catch((err) => {
      next(err);
    });
};
