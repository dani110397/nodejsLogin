const sql = require('mssql');

// MSSQL Konfiguration
const config = {
    user: '',
    password: '',
    server: "",
    database: '',
    options: {
    //   encrypt: false, // Verschlüsselung bei lokalen Verbindungen nicht erforderlich
      trustServerCertificate: true // Bei lokalen Verbindungen erforderlich
    }
  };

let poolPromise;

async function connectToDatabase() {
  try {
    const pool = await sql.connect(config);
    console.log('Connected to MSSQL');
    poolPromise = Promise.resolve(pool);
  } catch (err) {
    console.error('Database Connection Failed!', err);
    process.exit(1);
  }
}

module.exports = {
  sql, connectToDatabase, poolPromise: () => poolPromise
};
