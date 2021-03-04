import * as common from './common'
import * as validate from './validate.js'
import dictionary from '@/utils/dictionary'

/* 注册到vue全局 */
export default {
    ...common,
    ...validate,
    dictionary
}
