export const joinRoomEmitter = (
  id: any,
  socket: any,
  SocketEvents: any,
  currentUser: any
) => {
  const data = {
    owner: id,
    guest: currentUser.id.toString(),
  }

  socket.emit(SocketEvents.JOINROOM, data)
}
