// ============================================================
//  FIREBASE-CONFIG.JS — Safe Firebase initialization
//  Replace firebaseConfig values with your own project config.
//  Without config, game runs in bot-only offline mode.
// ============================================================

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  databaseURL:       "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId:         "YOUR_PROJECT",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

const isConfigured = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY';

if (isConfigured) {
  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
    const {
      getDatabase, ref, set, get, update, push,
      onValue, remove, onDisconnect, serverTimestamp
    } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js');

    const app = initializeApp(firebaseConfig);
    const db  = getDatabase(app);

    window.DB = {
      set:          (path, data)   => set(ref(db, path), data),
      update:       (path, data)   => update(ref(db, path), data),
      push:         (path, data)   => push(ref(db, path), data),
      get:          (path)         => get(ref(db, path)),
      onValue:      (path, cb)     => onValue(ref(db, path), snap => cb(snap)),
      onDisconnect: (path)         => onDisconnect(ref(db, path)),
      remove:       (path)         => remove(ref(db, path)),
      timestamp:    ()             => serverTimestamp(),
    };

    // Clean up stale players older than 30 seconds on connect
    window.DB._cleanupInterval = setInterval(async () => {
      try {
        const snap = await window.DB.get('rooms');
        if (!snap.val()) return;
        const rooms = snap.val();
        const now = Date.now();
        for (const [roomId, room] of Object.entries(rooms)) {
          if (!room.players) continue;
          for (const [pid, player] of Object.entries(room.players)) {
            if (now - (player.ts || 0) > 30000) {
              await window.DB.remove(`rooms/${roomId}/players/${pid}`);
            }
          }
        }
      } catch (_) {}
    }, 15000);

    console.log('[Firebase] Connected successfully.');
  } catch (err) {
    console.warn('[Firebase] Initialization failed — bot-only mode.', err);
    window.DB = null;
  }
} else {
  console.warn('[Firebase] No config — bot-only mode.');
  window.DB = null;
}