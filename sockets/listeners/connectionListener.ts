export const socketConnectionListener = (
  socket: any,
  SocketEvents: any,
  currentUser: any
) => {
  socket.on(SocketEvents.CONNECTION, () => {
    console.log('connected')
    console.log('The socketId of this client', socket.id)
    socket.emit(SocketEvents.ONLINE, {
      id: currentUser.id,
      socketId: socket.id,
    })
  })
  return () => {
    socket.off(SocketEvents.USER_ONLINE, (data: any) =>
      console.log('Unmount>>>>>>>>>>>>', data)
    )
  }
}
