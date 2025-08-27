import fetchKataById from "../models/katas.model.js";

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
