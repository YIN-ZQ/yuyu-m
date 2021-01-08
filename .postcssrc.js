module.exports = {
  plugins: {
    //   autoprefixer: {
    //     browsers: ['Android >= 4.0', 'iOS >= 8'],
    //   },
    'postcss-pxtorem': {
      // 本来是750/10 因为vant是基于375写的  所以要设置为37.5  缺点是使用设计稿的尺寸都必须 /2
      // rootValue: 37.5,
      rootValue ({ file }) {
        // console.log('处理的css文件:', file);
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
