import { openDB } from 'idb';

const DB_NAME = 'value-proposition-canvas';
const DB_VERSION = 1;

export const db = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    // Canvas store
    if (!db.objectStoreNames.contains('canvases')) {
      const canvasStore = db.createObjectStore('canvases', { keyPath: 'id' });
      canvasStore.createIndex('userId', 'userId');
    }

    // Users store
    if (!db.objectStoreNames.contains('users')) {
      db.createObjectStore('users', { keyPath: 'email' });
    }
  },
});

export async function saveCanvas(canvas) {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.put('canvases', canvas);
}

export async function getCanvas(id) {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.get('canvases', id);
}

export async function getAllCanvases(userId) {
  const db = await openDB(DB_NAME, DB_VERSION);
  const tx = db.transaction('canvases', 'readonly');
  const index = tx.store.index('userId');
  return index.getAll(userId);
}

export async function deleteCanvas(id) {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.delete('canvases', id);
}