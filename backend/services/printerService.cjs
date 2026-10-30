const escpos = require('escpos');
escpos.Network = require('escpos-network'); // 1. แก้ไขสะกดคำว่า escpos ให้ถูกต้อง

const printOrderReceipt = async (orderData) => {
    return new Promise((resolve, reject) => {
        try {
            const PRINTER_IP = '192.168.10.201';
            const device = new escpos.Network(PRINTER_IP);
            const printer = new escpos.Printer(device);

            device.open(function(error) {
                if (error) {
                    console.error('Printer Error Connection: ', error);
                    return reject(error);
                }

                // แสดงผลกระดาษจาก Thermal Printer
                printer

                    .font('a')
                    .align('c')
                    .style('normal')
                    .size(0,0)
                    .text('========= CDC Students Order =========')
                    .text('------------------')

                    .align('l')
                    .style('normal')
                    .size(0,0)
                    .text(`customer: ${orderData.name}`)
                    .text(`menuName: ${orderData.menuName}`)
                    .text(`sweetness: ${orderData.sweetness}`)
                    .text(`note: ${orderData.note || '-'}`)

                    .size(0,0)
                    .text('-----------------')
                    .text(`Time: ${new Date(orderData.timestamp).toLocaleTimeString('th-TH')}`)

                    .align('c')
                    .style('normal')
                    .size(0,0)
                    .text(' Stack Sats, Stay Humble ')
                    .text('---')
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