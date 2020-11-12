module.exports = {
    '**/*.js?(x)': (allStagedFiles) => {
        if (allStagedFiles.length) {
            return 'printf Script files arent allowed in src directory'
        }
        return ['npm run cusPre', 'vue-cli-service lint']
    }
}
