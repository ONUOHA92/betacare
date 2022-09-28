export const notifyUserListener = (
  socket: any,
  SocketEvents: any,
  notificationMessage: any,
  setNotifications: any
) => {
  socket.on(SocketEvents.NOTIFY_USER, (data: any) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>', data)
    if (notificationMessage[data.sender] === undefined) {
      let newNotification = {}
      newNotification[data.sender] = [data.message]
      setNotifications(newNotification)
    } else {
      let oldNotification = notificationMessage[data.sender]
      let updatedNotification = oldNotification.concat([data.message])
      notificationMessage[data.sender] = updatedNotification
      setNotifications(notificationMessage)
    }
  })
}
