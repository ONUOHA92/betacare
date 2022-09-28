export const statusTracker = (allOnlineUsers: string[], id: string) => {
  const onlineStatus = allOnlineUsers?.includes(id)
  if (onlineStatus) {
    return 'online'
  }
  return 'offline'
}
