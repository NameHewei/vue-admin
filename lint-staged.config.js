module.exports = {
    '**/*.js?(x)': (allStagedFiles) => {
        if (allStagedFiles.length) {
            // const file = allStagedFiles
            return []
        }
        return 'check success'
    }
}
