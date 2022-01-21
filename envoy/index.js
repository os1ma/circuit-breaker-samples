const http = require('http')

const PORT = 3000

const server = http
  .createServer((request, response) => {
    server.getConnections((error, connectionCount) => {
      // コネクション数 * 10 ミリ秒 wait してからレスポンスを返す
      setTimeout(() => {
        response.end('ok')

        const now = new Date().toLocaleTimeString()
        console.log(
          `[${now}] [Response] url = ${request.url}, statusCode = ${response.statusCode}, connectionCount = ${connectionCount}`
        )
      }, connectionCount * 10)
    })
  })
  .listen(PORT)

console.log(`Server running at http://localhost:${PORT}`)
