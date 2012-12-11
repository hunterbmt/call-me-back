function validPhoneNumber(number) {
    if (isEmpty(number)) {
        return false;
    }
    if (!hasPlusSign(number)) {
        return false;
    }
    var phoneNumber = number.substring(1);
    if (!containOnlyNumber(phoneNumber)) {
        return false;
    }
    return true;
}

function hasPlusSign(number) {
    if (number.charAt(0) != '+') {
        return false;
    }
    return true;
}

function containOnlyNumber(string) {
    return /^[0-9]+$/.test(string);
}

function isEmpty(string) {
    if (string == undefined || string.length < 1) {
        return true;
    }
    return false;
}

function checkMaxLength(string, maxLenght) {
    if (isEmpty(string) || string.length > maxLenght) {
        return false;
    }
    return true;
}