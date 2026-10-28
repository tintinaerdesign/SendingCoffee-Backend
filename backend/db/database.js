const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// จะเป็นการวางตำแหน่งไฟล์ฐานข้อมูลบน Sqlite โดยข้อมูลน่ะ จะสร้างเป็นไฟล์ pos.db อยู่บนโฟลเดอร์ db โดยอัติโนมัตอิเลยจ้า
const dbPath = path.resolve(__dirname, 'pos.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if(err) {
        console.error('Database Error :', err.message);
    } else {
        console.log('Database Connection Successful :');
    }
});

// สร้างตารางเก็บข้อมูล Order Tables
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             customer_name TEXT NOT NULL,
             menu_name TEXT NOT NULL,
             sweetness TEXT NOT NULL,
             amount REAL NOT NULL,
             note TEXT,
             status TEXT DEFAULT 'pending',
             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if(err){
            console.error('Table Database Error :', err.message);
        } else {
            console.log('Order table is ready');
        }
    });
});

module.exports = db;