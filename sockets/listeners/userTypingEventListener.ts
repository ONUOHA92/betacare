export const userTypingEventListener = (
  socket: any,
  SocketEvents: any,
  setUserTypingAction: any,
  userTyping: any
) => {
  socket.on(SocketEvents.NOTIFY_TYPING, (data) => {
    const { status, sender } = data
    const arr = []

    for (let i = 0; i < userTyping.length; i++) {
      arr.push(userTyping[i].toString())
    }

    if (status) {
      if (!arr.includes(sender)) arr.push(sender)
      setUserTypingAction(arr)
    } else {
      const users = arr.filter((user) => user !== sender.toString())
      setUserTypingAction(users)
    }
  })
  return () => {
    socket.off(SocketEvents.NOTIFY_TYPING, (data) => console.log(data))
  }
}
