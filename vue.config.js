module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': 'spring-library-api.herokuapp.com, gstatic.com, google.com, googleapis.com',
      // 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, X-Firebase-Auth, content-type, Authorization'
    }
  }
}
