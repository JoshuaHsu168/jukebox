import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { addTrackToPlaylist } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  console.log("Creating playlists...");
  for (let i = 1; i <= 10; i++) {
    await createPlaylist(
      "Playlist " + i,
      "Playlist number " + i
    );
  }

  console.log("Creating tracks...");
  for (let i = 1; i <= 20; i++) {
    const randomDuration = 120000 + Math.floor(Math.random() * 180000);
    await createTrack("Track " + i, randomDuration);
  }

  console.log("Adding tracks to playlists...");
  for (let i = 0; i < 15; i++) {
    const playlistId = 1 + Math.floor(Math.random() * 10);
    const trackId = 1 + Math.floor(Math.random() * 20);

    try {
      await addTrackToPlaylist(playlistId, trackId);
    } catch (error) {
      if (error.code !== "23505") {
        throw error;
      }
    }
  }
}