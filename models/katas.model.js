import kata from "../data/katas.js";

function fetchKataById() {
  if (kata.id) {
    return Promise.resolve(kata);
  } else {
    return Promise.reject(new Error("Kata not found"));
  }
}


export default fetchKataById



