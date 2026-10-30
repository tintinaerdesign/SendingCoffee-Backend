const express = require('express');
const router = express.Router();
const db = require('../db/database.cjs');
const { dynamicQrCode } = require('../services/qrServices.cjs');
const { printOrderReceipt } = require('../services/printerService.cjs');

router.post('/generate-qr', async (req, res) => {
    try{
        const { amount } = req.body;
        const PROMPTPAY_ACCOUNT = '0955702936';

        if(!amount || amount <= 0){
            return res.status(400).json({
                success: false,
                message: 'Invalid amount'
            });
        }

        const qrResult = await dynamicQrCode(PROMPTPAY_ACCOUNT, amount);
        return res.status(200).json({
            success: true,
            message: 'Successfully generated QR Code',
            qrImage: qrResult.qrImage
        });
    } catch (error) {
        console.error('QR code ERROR: ', error);
        return res.status(500).json({
            success: false,
            message: 'ไม่สามารถสร้าง QR Code ได้',
        })
    }
});

router.post('/printer', async (req, res) => {
    try {
        const orderData = req.body;
        if(!orderData){
            return res.status(400).json({
                success: false,
                message: 'Invalid order data'
            });
        }

        console.log('Receiving order for printing: ', orderData);
        const query = `INSERT INTO orders (customer_name, menu_name, sweetness, amount, note, status)
                       VALUES (?, ?, ?, ?, ?, ?)`;
        const params = [
            orderData.name,
            orderData.menuName,
            orderData.sweetness,
            orderData.amount || 0,
            orderData.note || '',
            'pending'
        ];

        // ใช้ better-sqlite3 แบบถูกต้อง
        const stmt = db.prepare(query);
        const info = stmt.run(params);
        console.log(`Order Saved to Database with ID: ${info.lastInsertRowid}`);

        const printResult = await printOrderReceipt(orderData);

        return res.status(200).json({
            success: true,
            message: 'Ready for printing',
            data: printResult
        })
    } catch (error) {
        console.error('orderData error: ', error);
        return res.status(500).json({
            success: false,
            message: 'Error in orderData'
        });
    }
});

module.exports = router;