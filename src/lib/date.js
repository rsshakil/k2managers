import { getUnixTime } from "date-fns";
import { DateTime } from "luxon";

const dateFormat = "yyyy/MM/dd";

const date = () => {
    const timeZone = DateTime.local().setZone("japan");
    const locale = DateTime.now().setLocale("ja");
    return { timeZone, locale };
};
const getFutureDaysUnix = (days) => {
    return Math.round(new Date().getTime() / 1000) + days * 24 * 60 * 60; //second
};

const timeFormatter = (str) => {
    // If first login then return Null
    if (!str) return null;

    const year = str.slice(0, 4);
    const month = str.slice(5, 7);
    const day = str.slice(8, 10);
    const hour = str.slice(11, 13);
    const minute = str.slice(14, 16);

    return `${year}/${month}/${day} ${hour}:${minute}`;
};
const getEndDateUnixTime = (date) => {
    return getUnixTime(date) + 24 * 60 * 60 - 1; 
};

export { date, dateFormat, timeFormatter, getFutureDaysUnix, getEndDateUnixTime };

