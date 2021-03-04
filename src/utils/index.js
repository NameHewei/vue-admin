import * as common from './common'
import * as validate from './validate.js'
import table from './table.js'

/* 注册到vue全局 */
export default {
    ...common,
    ...validate,
    table
}
