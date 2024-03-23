/**
 * 20/06/2022
 * Unix Timestamp convert to like 2022/07/20 14:30 this.
 * @param {*} unixTimestamp take unixTimestamp format
 * @returns new custom format as requirement
 */

function checkUnixTsToString(unixTimestamp) {
    let dateFormate = {};
    if (typeof unixTimestamp != 'string') unixTimestamp = unixTimestamp.toString();
    if (unixTimestamp.length <= 10) {
        dateFormate.date = new Date(unixTimestamp * 1000);

        dateFormate.year = dateFormate.date.getFullYear();
        dateFormate.month = ('0' + (dateFormate.date.getMonth() + 1)).slice(-2);
        dateFormate.day = ('0' + dateFormate.date.getDate()).slice(-2);
        dateFormate.hours = ('0' + dateFormate.date.getHours()).slice(-2);
        dateFormate.minutes = ('0' + dateFormate.date.getMinutes()).slice(-2);
        dateFormate.seconds = ('0' + dateFormate.date.getSeconds()).slice(-2);

        return dateFormate;
    }
}

// YYYY/MM/DD HH:MM
export const UnixTsToString = (unixTimestamp) => {
    const dateFormate = checkUnixTsToString(unixTimestamp);

    return (
        dateFormate &&
        dateFormate.year +
            '/' +
            dateFormate.month +
            '/' +
            dateFormate.day +
            ' ' +
            dateFormate.hours +
            ':' +
            dateFormate.minutes
    );
};
// YYYY/MM/DD HH:mm:ss
export const UnixTsToStringYYMMDD_HHMMSS = (unixTimestamp) => {
    const dateFormate = checkUnixTsToString(unixTimestamp);
    return (
        dateFormate &&
        `${dateFormate.year}/${dateFormate.month}/${dateFormate.day} ${dateFormate.hours}:${dateFormate.minutes}:${dateFormate.seconds}`
    );
};

// YYYY/MM/DD
export const UnixTsToStringYYMMDD = (unixTimestamp) => {
    const dateFormate = checkUnixTsToString(unixTimestamp);
    return dateFormate && dateFormate.year + '/' + dateFormate.month + '/' + dateFormate.day;
};
export const UnixTsToStringYYMMDDJP = (unixTimestamp) => {
    const dateFormate = checkUnixTsToString(unixTimestamp);
    return dateFormate && dateFormate.year + '年' + dateFormate.month + '月' + dateFormate.day + '日';
};

// MM/DD
export const UnixTsToStringMD = (unixTimestamp) => {
    const dateFormate = checkUnixTsToString(unixTimestamp);
    return dateFormate && dateFormate.month + '/' + dateFormate.day;
};

// HH:MM
export const UnixTsToStringHM = (unixTimestamp) => {
    const dateFormate = checkUnixTsToString(unixTimestamp);
    return dateFormate && dateFormate.hours + ':' + dateFormate.minutes;
};
