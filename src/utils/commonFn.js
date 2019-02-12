export function formatToQueryString (obj) {
    // format the object as a queryString
    const temp = [],
        allKeys = Object.keys(obj)

    allKeys.forEach(v => {
        if (obj[v]) temp.push(`${v}=${obj[v]}`)
    })

    return temp.join('&')
}

export function formatTime (dateString, type) {
    if (dateString) {
        type = type || 'precisionM'

        const date = new Date(dateString)
        let y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate(), h = date.getHours(), minute = date.getMinutes(), s = date.getSeconds()

        if (m < 10) m = '0' + m
        if (h < 10) h = '0' + h
        if (minute < 10) minute = '0' + minute
        if (s < 10) s = '0' + s

        const commandObj = {
            precisionM: function () {
                return y + '-' + m + '-' + d + '-' + ' ' + h + ':' + m
            },
            dateZH: function () {
                const temp = dateString.split(' ')[0].split('-')
                return `${temp[0]}年${temp[1]}月${temp[2]}日`
            }
        }

        return commandObj[type]()
    } else {
        return ''
    }
}
