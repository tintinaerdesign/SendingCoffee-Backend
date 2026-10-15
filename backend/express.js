const express = require('express');
const app = express();

app.use(express.json());

// API สำหรับเช็ค PIN
app.post('/api/verify-pin', (req,  res) => {
    const { pin } = req.body;

    if(pin === '123456'){
        return res.json({ success: true, message: 'PIN correct' });
    }
    return res.status(400).json({ success: false, message: 'PIN failed' });
});

app.listen(3000, () => console.log('Server started on port 3000'));