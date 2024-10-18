const fs = require('fs');
const path = require('path');
const pool = require('./config/db');

const runMigrations = async () => {
  try {
    const migrationFiles = fs.readdirSync(path.join(__dirname, 'migrations'));
    for (const file of migrationFiles) {
      const sql = fs.readFileSync(path.join(__dirname, 'migrations', file)).toString();
      await pool.query(sql);
      console.log(`Migration ${file} executed successfully.`);
    }
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    pool.end();
  }
};

runMigrations();