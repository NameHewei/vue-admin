/**
 * 判断当前环境域名,返回对应的接口地址
 */
export const getDomain = () => {
    let domain = ''
    const product = ''
    const test = 'http://localhost:7878'
    if (/arz/.test(location.href)) {
        domain = product
    } else {
        /** 测试环境 */
        domain = test
    }

    return domain
}

/**
 * @des 获取数组的交集
 */
export const arrayIntersection = (r1, r2) => {
    const a = [...new Set(r1)]
    const b = [...new Set(r2)]

    return a.filter(v => b.includes(v))
}

/**
 * @des 获取 queryString 转换为对象
 */
export function queryStringToObj (str) {
    str = str || 'xxxx/xx?a=1&b=2'

    const regExp = /(?:\?|&)([^&]*)/g
    let result = ''
    const arr = []

    while ((result = regExp.exec(str)) !== null) {
        const kv = result[1].split('=')
        const obj = {}
        obj[kv[0]] = kv[1]
        arr.push(obj)
    }

    return arr
}
/**
 * @des 将对象转换为 queryString
 */
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
 * @des 格式化时间
 */
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

/**
 * @des 高德地图异步按需加载
 */
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
        /* 这里删除的原因是为了防止同一个页面有多个该功能，导致所有的input都挂载同一个回调方法 */
        inputElement.parentNode.removeChild(inputElement)
    }
    inputElement = document.createElement('input')
    inputElement.setAttribute('id', inputId)
    inputElement.setAttribute('type', 'file')
    inputElement.setAttribute('style', 'display:none')
    document.body.appendChild(inputElement)
    inputElement.addEventListener('change', (e) => {
        callback(e.target.files)
    })
    inputElement.click()
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
