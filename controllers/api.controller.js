import fetchApi from "../models/api.model.js";

export default async function getApi(req, res) {
  const api = await fetchApi();
  res.send({ endpoints: api });
}
