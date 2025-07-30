import db from "#db/client";

export const getPlaylists = () => {
  return db.query("SELECT * FROM playlists;").then((result) => result.rows);
};

export const getPlaylistById = (id) => {
  return db
    .query("SELECT * FROM playlists WHERE id = $1;", [id])
    .then((result) => result.rows[0]);
};

export const createPlaylist = (name, description) => {
  return db
    .query(
      "INSERT INTO playlists(name, description) VALUES ($1, $2) RETURNING *;",
      [name, description]
    )
    .then((result) => result.rows[0]);
};

export const getTracksByPlaylistId = (playlistId) => {
  const query = `
    SELECT tracks.*
    FROM tracks
    JOIN playlists_tracks ON tracks.id = playlists_tracks.track_id
    WHERE playlists_tracks.playlist_id = $1;
  `;
  return db.query(query, [playlistId]).then((result) => result.rows);
};