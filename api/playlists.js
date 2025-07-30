import express from "express";
const router = express.Router();
export default router;

import {
  createPlaylist,
  getPlaylistById,
  getPlaylists,
  getTracksByPlaylistId,
} from "#db/queries/playlists";
import { addTrackToPlaylist } from "#db/queries/playlists_tracks";

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.post("/", async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing.");
  }
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send("Request body needs: name, description");
  }

  try {
    const playlist = await createPlaylist(name, description);
    res.status(201).send(playlist);
  } catch (error) {
    next(error);
  }
});

router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylistById(id);
  if (!playlist) {
    return res.status(404).send("Playlist not found.");
  }
  req.playlist = playlist;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});

router.post("/:id/tracks", async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing.");
  }
  const { trackId } = req.body;
  if (!trackId) {
    return res.status(400).send("Request body needs: trackId");
  }

  try {
    const playlistTrack = await addTrackToPlaylist(req.playlist.id, trackId);
    res.status(201).send(playlistTrack);
  } catch (error) {
    next(error);
  }
});