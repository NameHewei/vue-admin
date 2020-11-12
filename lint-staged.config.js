module.exports = {
    '**/*.js?(x)': (allStagedFiles) => {
        if (allStagedFiles.length) {
            const file = allStagedFiles
            return ` ${file}`
        }
        return ['vue-cli-service lint']
    }
}
