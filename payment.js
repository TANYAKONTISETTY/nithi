// Retrieve total amount from local storage and display it
const paymentAmount = localStorage.getItem('totalAmount');
document.getElementById('paymentAmount').textContent = paymentAmount;

// QR Code download functionality
document.getElementById('downloadQR').addEventListener('click', function () {
    const qrCode = document.getElementById('qrCode');
    const link = document.createElement('a');
    link.href = qrCode.src;
    link.download = 'qr_code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
