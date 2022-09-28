import io from 'socket.io-client'

const SERVER = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL
const socket = io(SERVER)
export const socketConn = () => {
  return socket
}
