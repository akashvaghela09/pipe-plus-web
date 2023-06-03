export const waitFor = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isValid = (value) => {
    if (value === undefined || value === null || value === "" || value === false) {
        return false;
    }
    return true;
}