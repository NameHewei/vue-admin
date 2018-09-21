import axios from 'axios'
import { Message } from 'element-ui'

export default function (config) {
    const httpService = axios.create({
        timeout: 2000,
        headers: {'Authorization': 'hewitt'}
    })

    httpService.interceptors.request.use((cfg) => {
        console.log('request', cfg)
        return cfg
    }, (error) => {
        console.log(error)
        return Promise.reject(error)
    })

    httpService.interceptors.response.use((res) => {
        if (config.showSuccessMsg) {
            Message({
                message: res.message,
                type: 'success',
                duration: 2000
            })
        }

        return res
    }, (error) => {
        console.log(error)
        Message({
            message: error.message,
            type: 'error',
            duration: 2000
        })
        return Promise.reject(error)
    })

    if (config.showSuccessMsg) delete config.showSuccessMsg

    return httpService(config)
}
