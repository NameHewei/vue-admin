module.exports = {
    '**/*.js?(x)': (allStagedFiles) => {
        if (allStagedFiles.length) {
            const file = allStagedFiles
            return `printf Script files arent allowed in src directory: ${file}`
        }
        return ['vue-cli-service lint']
    }
}
