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

/**
 * @des 获取字典值，或返回字典
 * 只有一个参数时，返回当前项的所有选项
 * 返回值可能是值、数组、对象
 * @param {Array} params 第一个值：需要的项的键值 第二个值：某一项的键值
 */
export const handleDectionary = (...params) => {
    const reFn = (o) => {
        if (params.length === 1) {
            return o
        } else {
            if (o instanceof Array && typeof o[0] === 'object') {
                return o.find(v => v.key === params[1]) || {}
            } else {
                return o[params[1]]
            }
        }
    }
    const commandObj = {
        val1: () => (reFn(['0', '1'])),
        val2: () => (reFn({ a: 'a', b: 'b', c: 'c', d: 'd' })),
        val3: () => (reFn([{ key: 0, value: 'data-1' }, { key: 2, value: 'data-2' }]))
    }

    return commandObj[params[0]]()
}

export function formatTime (dateString, type) {
    if (dateString) {
        type = type || 'precisionM'

        const date = new Date(dateString)
        const y = date.getFullYear(); let m = date.getMonth() + 1; const d = date.getDate(); let h = date.getHours(); let minute = date.getMinutes(); let s = date.getSeconds()

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

/* 获取本地文件 */
export const getFileFromLocal = (callback, inputId = 'cusSelectPhoto') => {
    let inputElement = document.querySelector(`#${inputId}`)

    if (inputElement) {
        inputElement.value = ''
    } else {
        inputElement = document.createElement('input')
        inputElement.setAttribute('id', inputId)
        inputElement.setAttribute('type', 'file')
        inputElement.setAttribute('style', 'display:none')
        document.body.appendChild(inputElement)
        inputElement.addEventListener('change', (e) => {
            callback(e.target.files)
        })
    }
    inputElement.click()
}

/* 获取环境域名 */
export const getDomain = () => {
    let domain = ''
    if (/xxx/.test(location.href)) {
        domain = 'xxx'
    }

    return domain
}

/**
 * @des 上传单个图片
 * @param {file: File} 选中的文件
 */
export const uploadPhoto = (file) => {
    const formData = new FormData()
    formData.append('对应的字段名称', file)
    return new Promise((resolve, reject) => {
        // 上传接口请求
    })
}

/* 导出 */
export const handleExport = () => {
    const a = document.createElement('a')
    a.href = 'url'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
