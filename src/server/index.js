const liveServer = require('live-server');
const fs = require('fs');
const https = require('https');
const path = require('path');
const crypto = require('crypto');
const { DatabaseSync } = require('node:sqlite');

const port = Number(process.env.PORT) || 8080;
const host = '0.0.0.0';
const publicRoot = path.resolve(__dirname, '../../dist/ed/browser');
const dataDir = path.resolve(__dirname, './data');
const dbPath = path.resolve(dataDir, './app.db');
const legacyProfilesPath = path.resolve(dataDir, './profiles.json');
const db = createDatabase();

const apiRoutes = {
  '/api/comments': 'https://jsonplaceholder.typicode.com/comments',
  '/api/posts': 'https://jsonplaceholder.typicode.com/posts',
};

console.log(`API proxy routes: ${Object.keys(apiRoutes).join(', ')}`);

function apiHeaders(contentType) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': contentType,
  };
}

function sendText(res, statusCode, message) {
  res.writeHead(statusCode, apiHeaders('text/plain; charset=utf-8'));
  res.end(message);
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, apiHeaders('application/json; charset=utf-8'));
  res.end(JSON.stringify(payload));
}

function sendOptions(res) {
  res.writeHead(204, apiHeaders('text/plain; charset=utf-8'));
  res.end();
}

function proxyJson(url, res) {
  https
    .get(url, (response) => {
      let data = '';

      if (response.statusCode < 200 || response.statusCode >= 300) {
        response.resume();
        sendText(res, 502, 'Bad Gateway');
        return;
      }

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          sendJson(res, 200, JSON.parse(data));
        } catch (error) {
          sendText(res, 502, 'Bad Gateway');
        }
      });
    })
    .on('error', () => {
      sendText(res, 502, 'Bad Gateway');
    });
}

function createDatabase() {
  fs.mkdirSync(dataDir, { recursive: true });

  const database = new DatabaseSync(dbPath);
  database.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  migrateLegacyProfiles(database);
  return database;
}

function migrateLegacyProfiles(database) {
  if (!fs.existsSync(legacyProfilesPath)) {
    return;
  }

  try {
    const profiles = JSON.parse(fs.readFileSync(legacyProfilesPath, 'utf8'));
    const insert = database.prepare(`
      INSERT OR IGNORE INTO profiles (id, name, age, password_hash, password_salt, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const profile of profiles) {
      if (!profile.id || !profile.name || !profile.createdAt) {
        continue;
      }

      insert.run(
        profile.id,
        profile.name,
        Number(profile.age),
        profile.passwordHash ?? '',
        profile.passwordSalt ?? '',
        profile.createdAt
      );
    }
  } catch (error) {
    console.warn('Could not migrate legacy profiles.json data:', error.message);
  }
}

function readProfiles() {
  return db
    .prepare(
      `
        SELECT id, name, age, created_at AS createdAt
        FROM profiles
        ORDER BY created_at DESC
      `
    )
    .all();
}

function saveProfile(profile) {
  db.prepare(
    `
      INSERT INTO profiles (id, name, age, password_hash, password_salt, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `
  ).run(
    profile.id,
    profile.name,
    profile.age,
    profile.passwordHash,
    profile.passwordSalt,
    profile.createdAt
  );
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });
}

function createProfile(input) {
  const name = String(input.name ?? '').trim();
  const age = Number(input.age);
  const password = String(input.password ?? '');

  if (!name || !Number.isFinite(age) || age < 1 || password.length < 8) {
    return null;
  }

  const passwordSalt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto.scryptSync(password, passwordSalt, 64).toString('hex');

  return {
    id: crypto.randomUUID(),
    name,
    age,
    passwordHash,
    passwordSalt,
    createdAt: new Date().toISOString(),
  };
}

function toPublicProfile(profile) {
  return {
    id: profile.id,
    name: profile.name,
    age: profile.age,
    createdAt: profile.createdAt,
  };
}

async function handleProfiles(req, res) {
  if (req.method === 'GET') {
    sendJson(res, 200, readProfiles());
    return;
  }

  if (req.method !== 'POST') {
    sendText(res, 405, 'Method Not Allowed');
    return;
  }

  try {
    const profile = createProfile(await readRequestBody(req));

    if (!profile) {
      sendText(res, 400, 'Invalid profile');
      return;
    }

    saveProfile(profile);
    sendJson(res, 201, toPublicProfile(profile));
  } catch (error) {
    sendText(res, 400, 'Invalid request');
  }
}

async function apiMiddleware(req, res, next) {
  const requestPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  const routeUrl = apiRoutes[requestPath];

  if (requestPath === '/api/profiles') {
    if (req.method === 'OPTIONS') {
      sendOptions(res);
      return;
    }

    await handleProfiles(req, res);
    return;
  }

  if (!routeUrl) {
    next();
    return;
  }

  if (req.method === 'OPTIONS') {
    sendOptions(res);
    return;
  }

  if (req.method !== 'GET') {
    sendText(res, 405, 'Method Not Allowed');
    return;
  }

  proxyJson(routeUrl, res);
}

liveServer.start({
  port,
  host,
  root: publicRoot,
  file: 'index.html',
  open: false,
  middleware: [apiMiddleware],
});

process.on('exit', () => {
  db.close();
});
