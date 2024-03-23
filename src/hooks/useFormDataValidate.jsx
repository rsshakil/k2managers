export default function useFormDataValidate() {
    let valid = true;
    let errors = [];

    function validate(validationSchema, formData = [], allData = []) {
        if (Array.isArray(formData)) {
            for (const data of formData) {
                errors.push(validateData(validationSchema, data, allData));
            }
        } else {
            errors.push(validateData(validationSchema, formData, allData));
        }
        return { valid, errors };
    }

    function validateData(validationSchema, data, all = []) {
        const validationFields = validationSchema.fields;
        const newErrors = {};

        for (const key in validationFields) {
            const rules = validationFields[key]['tests'];
            const value = data[key] ? data[key].trim() : '';

            for (const rule of rules) {
                const { name, message, params } = rule['OPTIONS'];

                if (name === 'required' && !value) {
                    valid = false;
                    newErrors[key] = message;
                } else if (name === 'max' && +value.length > +params.max) {
                    valid = false;
                    newErrors[key] = message;
                } else if (name === 'min' && +value.length < +params.min) {
                    valid = false;
                    newErrors[key] = message;
                } else if (name === 'matches' && value) {
                    if (params.regex === 'UNIQUE') {
                        if (Array.isArray(all) && all.length > 1) {
                            const total = all.reduce((count, x) => (x[key] === value ? count + 1 : count), 0);
                            if (total > 1) {
                                valid = false;
                                newErrors[key] = message;
                            }
                        }
                    } else if (!params.regex.test(value)) {
                        valid = false;
                        newErrors[key] = message;
                    }
                }
            }
        }

        return { ...data, error: newErrors };
    }

    return { validate };
}
