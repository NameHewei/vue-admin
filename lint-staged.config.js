// const fs = require('fs')
module.exports = {
    '**/*.js?(x)': (allStagedFiles) => {
        if (allStagedFiles.length) {
            const str = allStagedFiles.map(f => f)
            return str
        }
        return 'check success'
    }
}
