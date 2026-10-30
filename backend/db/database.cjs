const Database = require('better-sqlite3');
const path = require('path');

// กำหนดตำแหน่งไฟล์ฐานข้อมูล pos.db ในโฟลเดอร์ db อัตโนมัติ
const dbPath = path.resolve(__dirname, 'pos.db');

// สร้างหรือเชื่อมต่อกับฐานข้อมูลด้วย better-sqlite3
const db = new Database(dbPath, { verbose: console.log });

console.log('Database Connection Successful :');

// สร้างตารางเก็บข้อมูล orders
db.prepare(`
    CREATE TABLE IF NOT EXISTS orders (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         customer_name TEXT NOT NULL,
         menu_name TEXT NOT NULL,
         sweetness TEXT NOT NULL,
         amount REAL,
         note TEXT,
         status TEXT DEFAULT 'pending',
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`).run();

console.log('Order table is ready');

module.exports = db;