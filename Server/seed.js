const fs = require('fs');
const path = require('path');
const db = require('./DB/db');

async function runSQLFilesFrom(dirPath) {
  const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.sql'));
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const sql = fs.readFileSync(filePath, 'utf-8');
    console.log(`Running ${file}...`);
    await db.query(sql);
  }
}

(async () => {
  try {
    console.log('Seeding books...');
    await runSQLFilesFrom(path.join(__dirname, 'DB/seeds/books'));

    console.log('Seeding games...');
    await runSQLFilesFrom(path.join(__dirname, 'DB/seeds/games'));

    console.log('✅ Seeding complete.');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
})();