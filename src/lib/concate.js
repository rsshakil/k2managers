const numberWithCommas = (x, l) => {
    // x type number
    return checkNumberLength(x.toString(), l)
        ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : null;
}
const numberWithHiphen =(x, l)=> {
    // x type string
    return checkNumberLength(x, l)
        ? x.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "-")
        : null;
}
const checkNumberLength = (number, length) => {
    return number && number.length <= length ? number : null;
}


export {numberWithCommas , numberWithHiphen , checkNumberLength}
