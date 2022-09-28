export const leaveRoomEmitter = (
  id: any,
  socket: any,
  SocketEvents: any,
  currentUser: any
) => {
  const data = {
    owner: id?.toString(),
    guest: currentUser?.toString(),
  }
  socket.emit(SocketEvents.LEAVEROOM, data)
}
