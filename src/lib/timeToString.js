export const timeToString=(time)=>{
    const timeString = time.toString().split("");
    timeString.splice(-2, 0,":").join()
    return timeString;
}