import { server as webSocketServer } from 'websocket'
import http from 'http'

const port = 3000

const httpServer = http.createServer()
httpServer.listen(port)
console.log(`listening on port ${port}`)

const websocket = new webSocketServer({
  httpServer,
})

const counter = () => {
  let x = 0
  return [() => x, () => x++]
}

const [state, increase] = counter()

websocket.on('request', (request) => {
  const connection = request.accept(null, request.origin)
  connection.on('message', () => {
    increase()
    console.log(state())
  })
})
