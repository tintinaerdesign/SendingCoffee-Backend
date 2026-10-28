const express = require('express');
const app = express();
const cors = require('cors');
// นำเข้าไฟล์ route ที่เขียนแยกไว้ตอนแรก
const printRoutes = require('./routes/routes');

app.use(cors());
app.use(express.json());
app.use('/api/orders', printRoutes);

// API สำหรับเช็ค PIN
app.post('/api/order', (req,  res) => {
    const { pin } = req.body;

    if(pin === '123456'){
        return res.json({ success: true, message: 'PIN correct' });
    }
    return res.status(400).json({ success: false, message: 'PIN failed' });
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server started on ${port}`));