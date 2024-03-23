/*
 * To get the value from local storage that matches the given key
 * @param {string} key
 * @returns The value of the key argument
 */
export const parseLocalStorageJSON = (key) => {
    if (!key || typeof key !== "string") {
        throw new Error("Invalid key");
    }
    /**
     * Handle non-string value with JSON.parse.
     * Catch string value and return it
     */
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch {
        throw new Error("couldn't parse local storage");
    }
};

/**
 * To set the key-value pair to local storage
 * @param {string} key
 * @param {any} value
 * @returns N/A
 */
export const setToLocalStorage = (key, value) => {
    if (!key || typeof key !== "string") {
        throw new Error("Invalid key");
    }

    if (typeof value === "object") {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }
};

/**
 * To remove something from local storage
 * @param {string} key
 * @returns N/A
 */
export const removeFromLocalStorage =(key)=>{
    if (!key || typeof key !== "string") {
        throw new Error("Invalid key");
    }
    if(parseLocalStorageJSON(key)){
        localStorage.removeItem(key)
    }else{
        throw new Error('Key not found')
    }
    
}