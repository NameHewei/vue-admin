import * as common from './common'
import * as validate from './validate.js'
import table from './table.js'
import dictionary from '@/utils/dictionary'

/* 注册到vue全局 */
export default {
    ...common,
    ...validate,
    table,
    dictionary
}
