const generatePayload = require('promptpay-qr');
const QRCode = require('qrcode'); // 1. แก้ชื่อตัวแปรให้เป็นตัว C ใหญ่ตรงกัน

/**
 * @param {string} promptpayId
 * @param {number|string} amount
 */
const dynamicQrCode = async (promptpayId, amount) => {
    try {
        // แปลงข้อมูลเป็น Payload String ตามมาตรฐาน EMV Co หรือ Thai Payment QR Standard
        const payload = generatePayload(promptpayId, { amount: parseFloat(amount) });

        // แปลงข้อความ Payload String เป็น QR Code (Base64)
        const qrImage = await QRCode.toDataURL(payload, {
            type: 'image/png',
            margin: 2,
            scale: 8,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });

        return {
            success: true,
            message: 'Successfully Insert qr code',
            qrImage: qrImage
        };

    } catch (error) {
        console.error('Error Generate Qr Code: ', error);
        throw error;
    }
};

module.exports = { dynamicQrCode };