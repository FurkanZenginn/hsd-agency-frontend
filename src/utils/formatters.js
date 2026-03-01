export const formatPhoneNumber = (value) => {
    // "+90" prefix'i asla silinemez, minimum değer her zaman "+90"
    if (!value) return '+90';

    let digits = value.replace(/\D/g, '');

    // Hangi durumda olursa olsun "+90" korunur
    if (digits === '' || digits === '9' || digits === '90') return '+90';

    if (digits.startsWith('90')) {
        digits = digits.substring(2);
        if (digits.startsWith('0')) digits = digits.substring(1);
    } else if (digits.startsWith('0')) {
        digits = digits.substring(1);
    }

    if (digits.length === 0) return '+90';

    if (digits.length > 10) {
        digits = digits.substring(0, 10);
    }

    let formatted = '+90 ';
    if (digits.length > 0) {
        formatted += '(' + digits.substring(0, 3);
    }
    if (digits.length >= 4) {
        formatted += ') ' + digits.substring(3, 6);
    }
    if (digits.length >= 7) {
        formatted += ' ' + digits.substring(6, 8);
    }
    if (digits.length >= 9) {
        formatted += ' ' + digits.substring(8, 10);
    }

    return formatted;
};
