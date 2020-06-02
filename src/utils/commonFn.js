import Cookies from 'js-cookie'

export function formatToQueryString (obj) {
    // format the object as a queryString
    const temp = []
    const allKeys = Object.keys(obj)

    allKeys.forEach(v => {
        if (obj[v]) temp.push(`${v}=${obj[v]}`)
    })

    return temp.join('&')
}

export function formatTime (dateString, type) {
    if (dateString) {
        type = type || 'precisionM'

        const date = new Date(dateString)
        let y = date.getFullYear(); let m = date.getMonth() + 1; let d = date.getDate(); let h = date.getHours(); let minute = date.getMinutes(); let s = date.getSeconds()

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

export const cookieMethods = {
    get (name) {
        return Cookies.get(name)
    },

    set (name, value) {
        Cookies.set(name, value)
    }
}

export const aMapLoad = () => {
    if (window.AMap) {
        return new Promise((resolve) => {
            resolve()
        })
    }
    const loadAMap = new Promise((resolve, reject) => {
        const src = 'https://webapi.amap.com/maps?v=1.4.10&key=6d7aa6691cb9e3bc264003ea296181d3&plugin=AMap.MouseTool,AMap.PolyEditor,AMap.Geocoder,AMap.Autocomplete,AMap.PlaceSearch,AMap.ToolBar'
        const scriptEle = document.createElement('script')
        scriptEle.onerror = _ => {
            reject(new Error('load AMap failure!'))
        }
        scriptEle.onload = _ => {
            resolve()
        }
        scriptEle.src = src
        document.head.appendChild(scriptEle)
    })
    const loadAMapUI = () => {
        return new Promise((resolve, reject) => {
            const src = '//webapi.amap.com/ui/1.1/main.js'
            const scriptEle = document.createElement('script')
            scriptEle.onerror = _ => {
                reject(new Error('load AMapUI failure!'))
            }
            scriptEle.onload = _ => {
                resolve('load amap ui success')
            }
            scriptEle.src = src
            document.head.appendChild(scriptEle)
        })
    }
    return loadAMap.then(() => {
        /* 等待地图api加载完成，才加载UI */
        return loadAMapUI()
    })
}
