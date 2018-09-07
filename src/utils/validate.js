export default {
    positiveInteger (n) {
        return /^[1-9][0-9]{0,10}$/.test(n)
    },

    mobilePhone (n) {
        return /^1[0-9]{10}$/.test(n)
    }
}
