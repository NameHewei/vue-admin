export function formatToQueryString (obj) {
    // format the object as a queryString
    const temp = [],
        allKeys = Object.keys(obj)

    allKeys.forEach(v => {
        if (obj[v]) temp.push(`${v}=${obj[v]}`)
    })

    return temp.join('&')
}
