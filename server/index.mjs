import { server as webSocketServer } from 'websocket'
import http from 'http'

const port = 3000

const httpServer = http.createServer()
httpServer.listen(port)
console.log(`listening on port ${port}`)

const websocket = new webSocketServer({
  httpServer,
})

const connections = []

const counter = () => {
  let x = 0
  return [() => x, () => x++]
}

const [state, increase] = counter()

websocket.on('request', (request) => {
  const connection = request.accept(null, request.origin)
  connections.push(connection)
  connection.on('message', () => {
    increase()
    connections.forEach((connection) => {
      connection.sendUTF(JSON.stringify({ state: state() }))
    })
  })
})
