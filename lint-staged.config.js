module.exports = {
    '**/*.js?(x)': (allStagedFiles) => {
        if (allStagedFiles.length) {
            // const file = allStagedFiles
            return 'file check'
        }
        return 'check success'
    }
}
