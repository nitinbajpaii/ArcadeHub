const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const files = {
  users: path.join(dataDir, 'users.json'),
  scores: path.join(dataDir, 'scores.json'),
  feedback: path.join(dataDir, 'feedback.json')
};

Object.values(files).forEach(file => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([]));
  }
});

const readData = (type) => {
  try {
    const data = fs.readFileSync(files[type], 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeData = (type, data) => {
  fs.writeFileSync(files[type], JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
