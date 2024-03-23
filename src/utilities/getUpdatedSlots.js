export const getUpdatedSlots = (values, initialValues) => {
    const updatedSlots = []; //the only modified fields of the slot table will be stored here
    //get only modified fields by comparing with initial values
    if (values) {
        Object.entries(values).forEach((entry) => {
            let key = entry[0];
            let value = entry[1];
            if (value === "") {
                value = 0;
            }
            if (value !== initialValues[key] && key !== "memo") {
                updatedSlots.push({
                    count: value,
                    slotId: parseInt(key)
                })
            }
        });
    }
    return updatedSlots;
}
export const getAllInputSlotObject=(values) =>{
    const updatedSlots = []; //the only modified fields of the slot table will be stored here
    //get only modified fields by comparing with initial values
    if (values) {
        Object.entries(values).forEach((entry) => {
            let key = entry[0];
            let value = entry[1];
            if (value === "") {
                value = 0;
            }
            if ( key !== "memo") {
                updatedSlots.push({
                    count: value,
                    slotId: parseInt(key)
                })
            }
        });
    }
    return updatedSlots;

}