import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('photos.db');

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      image_uri TEXT NOT NULL,
      latitude REAL,
      longitude REAL,
      created_at TEXT NOT NULL
    );
  `);
}

export function addPhoto(photo) {
  db.runSync(
    `INSERT INTO photos 
    (title, image_uri, latitude, longitude, created_at)
    VALUES (?, ?, ?, ?, ?)`,
    [
      photo.title,
      photo.image_uri,
      photo.latitude,
      photo.longitude,
      photo.created_at,
    ]
  );
}

export function getPhotos() {
  return db.getAllSync(`SELECT * FROM photos ORDER BY id DESC`);
}

export function deletePhoto(id) {
  db.runSync(`DELETE FROM photos WHERE id = ?`, [id]);
}