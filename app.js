import express from "express";
const app = express();
export default app;

import playlistsRouter from "#api/playlists";
import tracksRouter from "#api/tracks";

app.use(express.json());

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    return res.status(400).send(err.detail);
  }
  if (err.code === "23505") {
    return res.status(400).send(err.detail);
  }
  if (err.code === "22P02") {
    return res.status(400).send("Invalid input syntax for type integer.");
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});