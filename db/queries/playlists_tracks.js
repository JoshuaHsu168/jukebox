import db from "#db/client";

export const addTrackToPlaylist = (playlist_id, track_id) => {
  return db
    .query(
      "INSERT INTO playlists_tracks(playlist_id, track_id) VALUES ($1, $2) RETURNING *;",
      [playlist_id, track_id]
    )
    .then((result) => result.rows[0]);
};