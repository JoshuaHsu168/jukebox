import db from "#db/client";

export const getTracks = () => {
  return db.query("SELECT * FROM tracks;").then((result) => result.rows);
};

export const getTrackById = (id) => {
  return db
    .query("SELECT * FROM tracks WHERE id = $1;", [id])
    .then((result) => result.rows[0]);
};

export const createTrack = (name, duration_ms) => {
  return db
    .query("INSERT INTO tracks(name, duration_ms) VALUES ($1, $2) RETURNING *;", [
      name,
      duration_ms,
    ])
    .then((result) => result.rows[0]);
};