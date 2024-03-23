const roleFormFun = {};

roleFormFun.dynamicKeyNameCheck = (ParentChildData, values) => {
    ParentChildData.forEach((objItem, index) => {
        let i = index + 1;
        if (objItem?.name.length === +1) {
            if (values['r' + i]) {
                // Dynamic key check a JavaScript object variable -- values["r" + i]
                values['r' + i] = 1; //FullRight = 1
            } else {
                values['r' + i] = 0; //Default = 0
            }
        } else if (objItem?.name.length === +2) {
            // If CheckBox have Child CheckBox
            if (values['c' + i]) {
                values['r' + i] = 1; //FullRight = 1
            } else {
                if (values['r' + i]) {
                    values['r' + i] = 2; // ViewOnly
                } else {
                    values['r' + i] = 0; //Default = 0
                }
            }
        }
    });
};

export default roleFormFun;
