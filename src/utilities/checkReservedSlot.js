const x = 0; //this can be changed by authority
const percent = 50; //default value, can be changed by authority

export const checkReservedSlotA = (slotNumber, maxNumber) => {
    if (slotNumber > maxNumber - x) return true; //if this condition is true, we will show error (red color)
    else return false;
};
export const checkReservedSlotB = (slotNumber, maxNumber) => {
    if (slotNumber < maxNumber - x) return true; //if this condition is true, we will show error
    else return false;
};
export const checkReservedSlotC = (slotNumber, maxNumber) => {
    if (slotNumber > ((maxNumber * percent)/100)) return true; //if this condition is true, we will show error
    else return false;
    
};
export const checkReservedSlotD = (slotNumber, maxNumber) => {
    if (slotNumber < ((maxNumber * percent)/100)) return true;//if this condition is true, we will show error
    else return false;
};
export const checkReservedSlotE = (slotNumber, maxNumber) => {
    if (slotNumber === maxNumber - x) return true; //if this condition is true, we will show error (red color)
    else return false;
};
export const checkReservedSlot = (slotNumber, maxNumber) => {
    return checkReservedSlotE(slotNumber, maxNumber)
};

