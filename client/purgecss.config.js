module.exports = {
  content: ['build/static/index.html', 'build/static/js/*.js'],
  css: ['build/static/css/*.css'],
  whitelistPatterns: [/Toastify(.*)/],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
}