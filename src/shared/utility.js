export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
}

export const checkVadility = (value, rules) => {
    let isValid = true;

    if (!rules){
        return true;
    }

    if(rules.required) {
        //trim remove any leading white spaces
        isValid = value.trim() !== ' ' && isValid; 
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    } 
    // if (rules.isEmail) {
    //     const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-] + (?:\.)[a-z0-9!#$]
    // }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;
}