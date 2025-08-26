import fetchKataById from "../model/katas.model";

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
