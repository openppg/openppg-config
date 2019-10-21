const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  }
})

module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  }
};
