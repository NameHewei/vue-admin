export const positiveInteger = (n) => {
    return /^[1-9][0-9]{0,10}$/.test(n)
}

export const mobilePhone = (n) => {
    return /^1[0-9]{10}$/.test(n)
}

export const isNumber = (n) => {
    return !!parseFloat(n)
}
