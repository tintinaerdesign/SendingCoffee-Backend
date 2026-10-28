const escpos = require('escpos');
escpos.Network = require('escpos-network'); // 1. แก้ไขสะกดคำว่า escpos ให้ถูกต้อง

const printOrderReceipt = async (orderData) => {
    return new Promise((resolve, reject) => {
        try {
            const PRINTER_IP = '*********';
            const device = new escpos.Network(*****); //รอใส่ PRINTER_IP
            const printer = new escpos.Printer(device); // 2. เอาเครื่องหมาย Single Quote ออก ให้ส่งตัวแปร device เข้าไป

            device.open(function(error) {
                if (error) {
                    console.error('Printer Error Connection: ', error);
                    return reject(error);
                }

                // แสดงผลกระดาษจาก Thermal Printer
                printer
                    .font('a')
                    .align('c')
                    .style('b')
                    .size(1,1)
                    .text('===== CDC Students Order =====')
                    .text('---------------------------------------')

                    .align('l')
                    .style('normal')
                    .text(`ชื่อลูกค้า: ${orderData.name}`)
                    .text(`เมนู: ${orderData.menuName}`)
                    .text(`ระดับความหวาน: ${orderData.sweetness}`)
                    .text(`หมายเหตุ: ${orderData.note || '-'}`)

                    .text('----------------------------------------')
                    .text(`เวลาสั่ง: ${new Date(orderData.timestamp).toLocaleTimeString('th-TH')}`)

                    .align('c')
                    .text('⚡ Stack Sats, Stay Humble ⚡')
                    .cut() // เป็นการตัดกระดาษอัติโนมัติ
                    .close(() => {
                        console.log('Successfully Printed');
                        resolve({
                            success: true,
                            message: 'พิมพ์ใบสำเร็จ'
                        });
                    });
            });
        } catch (err) {
            console.error('Printer Error Connection: ', err);
            reject(err);
        }
    });
};

module.exports = { printOrderReceipt };