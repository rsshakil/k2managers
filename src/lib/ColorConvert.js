export const rgbaTohex = (orig) => {
    let a, isPercent;
    let rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    let alpha = ((rgb && rgb[4]) || '').trim();
    let hex = rgb
        ? '#' +
          (rgb[1] | (1 << 8)).toString(16).slice(1) +
          (rgb[2] | (1 << 8)).toString(16).slice(1) +
          (rgb[3] | (1 << 8)).toString(16).slice(1)
        : orig;

    if (alpha !== '') {
        isPercent = alpha.indexOf('%') > -1;
        a = parseFloat(alpha);
        if (!isPercent && a >= 0 && a <= 1) a = Math.round(255 * a);
        else if (isPercent && a >= 0 && a <= 100) a = Math.round((255 * a) / 100);
        else a = '';
    }

    hex += (a | (1 << 8)).toString(16).slice(1);

    return hex;
};

export const isValidHex = (hex) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

const getChunksFromString = (st, chunkSize) => st.match(new RegExp(`.{${chunkSize}}`, 'g'));
const convertHexUnitTo256 = (hexStr) => parseInt(hexStr.repeat(2 / hexStr.length), 16);

export const hexToRGBA = (hex) => {
    if (!isValidHex(hex)) hex = '#ffffffff';

    const chunkSize = Math.floor((hex.length - 1) / 3);
    const hexArr = getChunksFromString(hex.slice(1), chunkSize);
    return hexArr.map(convertHexUnitTo256);
};

export const rgbaToHexNew = (r, g, b, a = null) => {
    const outParts = [r.toString(16), g.toString(16), b.toString(16)];

    const math = Math.round(a * 255)
        .toString(16)
        .substring(0, 2);
    if (a) outParts.push(math);

    // Pad single-digit output values
    outParts.forEach(function (part, i) {
        if (part.length === 1) outParts[i] = '0' + part;
    });

    return '#' + outParts.join('');
};

export const rgbToObj = (rbgStr) => {
    let colors = ['r', 'g', 'b', 'a'];

    let obj = new Object();
    let colorArr = rbgStr.slice(rbgStr.indexOf('(') + 1, rbgStr.indexOf(')')).split(', ');
    colorArr.forEach((k, i) => (obj[colors[i]] = k));

    return obj;
};

export const RGBAStrToHexA = (rgba, forceRemoveAlpha = false) => {
    return (
        '#' +
        rgba
            .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
            .split(',') // splits them at ","
            .filter((_string, index) => !forceRemoveAlpha || index !== 3)
            .map((string) => parseFloat(string)) // Converts them to numbers
            .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // Converts alpha to 255 number
            .map((number) => number.toString(16)) // Converts numbers to hex
            .map((string) => (string.length === 1 ? '0' + string : string)) // Adds 0 when length of one number is 1
            .join('')
    ); // Puts the array to together to a string
};

export function isValidColor(color) {
    var el = document.createElement('div');
    el.style.backgroundColor = color;
    return el.style.backgroundColor ? true : false;
}

export const defaultColorCode = '#ffffffff';
