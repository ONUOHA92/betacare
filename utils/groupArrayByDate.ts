interface IActivity {
  currentDate: Date
  activityLogsResponse: ActivityLogsResponse
}

interface ActivityLogsResponse {
  time: string
  action: string
  userType: string
}

export const groupArrayBasedOnDate = (arr: IActivity[]) => {
  if (arr) {
    const groups = arr?.reduce((groups, activities) => {
      const date = activities?.currentDate?.toString() as string
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(activities)
      return groups
    }, {})

    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        activities: groups[date],
      }
    })

    return groupArrays
  } else {
    return
  }
}
