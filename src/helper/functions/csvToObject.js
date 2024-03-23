window.Buffer = window.Buffer || require('buffer').Buffer;
const Encoding = require('encoding-japanese');
const iconv = require('iconv-lite');
export const csvToObject = (file) => {
    return new Promise((resolve, reject) => {
        const result = [];
        const reader = new FileReader();

        const convertCSV = (e) => {
            const csv = e.target.result;
            console.log('csv',csv);
            var array = Buffer.from(new Int8Array(csv));
            console.log(array,'array');
            let detectedEncoding = Encoding.detect(array);
            console.log('sourceEncoding',detectedEncoding);
            let convertedBuffer = Encoding.convert(array, {
                to: 'UNICODE',
                from: detectedEncoding
            });
            let decodedString = Encoding.codeToString(convertedBuffer);
            console.log('decodedString',decodedString);
            const lines = decodedString.split('\n');

            const headers = lines[0].split(',').map((item) => item.trim());

            for (let i = 1; i < lines.length; i++) {
                const obj = {};
                const currentLine = lines[i].split(',');

                for (let j = 0; j < headers.length; j++) {
                    if (!currentLine[j]?.trim()) continue;
                    obj[headers[j]] = currentLine[j]?.trim();
                }
                result.push(obj);
            }
            console.log(result)
            resolve(result);
            if (!result.length) reject('get no data');
        };

        reader.onloadend = convertCSV;
        reader.readAsArrayBuffer(file);
    });
};

export const csvDataItems = (file) => {
    return new Promise((resolve, reject) => {
        const result = {
            csvHeaders:[],
            csvBody:[]
        };
        const reader = new FileReader();

        const convertCSV = (e) => {
            const csv = e.target.result;//broken
            console.log('csv',csv);
            var array = Buffer.from(new Int8Array(csv));
            console.log(array,'array');
            let detectedEncoding = Encoding.detect(array);
            console.log('sourceEncoding',detectedEncoding);
            let convertedBuffer = Encoding.convert(array, {
                to: 'UNICODE',
                from: detectedEncoding
            });
            let decodedString = Encoding.codeToString(convertedBuffer);
            console.log('decodedString',decodedString);
            const lines = decodedString.split('\n');

            const headers = lines[0].split(',').map((item) => {
                return {column_width: "w-48",headerName: item.trim()}
            });
            let items = [];
            for (let i = 1; i < lines.length; i++) {
                const currentLine = lines[i].split(',').map((item) => item.trim());
                items.push(currentLine);
            }
            
            resolve({
                csvImportPreviewHeaderData:headers,
                csvImportPreview:items
            });
        };

        reader.onloadend = convertCSV;
        reader.readAsArrayBuffer(file);
    });
};
