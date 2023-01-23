export function byteConverter(bytes, decimals) {
    const K_UNIT = 1024;
    const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

    if(bytes === 0) return "0 Byte";

    let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));
    return parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) + " " + SIZES[i];
}

export function declination(number, txt, cases = [2, 0, 1, 1, 1, 2]) {
    return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
