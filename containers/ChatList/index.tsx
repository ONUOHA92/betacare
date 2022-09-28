import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import LargeCardWithChildren from 'components/LargeCardWithChildren'
import styles from 'containers/PatientMessage/styles.module.css'
import { statusTracker } from 'utils/messaging/status-tracker'
import { MAX_LAST_MESSAGE_CHARACTERS } from 'constants/constants'
import { truncateString } from 'utils/truncateString'
import { NotificationContext } from 'containersDoctors/DashboardLayout'
import { NotificationContext as NotificationContextPatient } from 'containers/DashboardLayout'
import { IClient, IOtherNotification } from 'interface/chat'

interface Props {
  getBg?: Function
  selectChat?: Function
  allUsers?: any[]
  id?: string
  onlineUsers?: string[]
  patient: boolean
}

const ChatList = ({
  getBg,
  selectChat,
  allUsers,
  onlineUsers,
  patient,
}: React.PropsWithChildren<Props>) => {
  // const { chatNotifications, newNotification } = React.useContext(
  //   patient ? NotificationContextPatient : NotificationContext
  // )

  // const notificationBySize =
  //   chatNotifications?.length > newNotification?.length
  //     ? chatNotifications
  //     : newNotification

  // const pickSpecificNotiBasedOnId = (id: number) => {
  //   const userNoti = notificationBySize?.filter(
  //     (noti: IOtherNotification) => noti.userId === id?.toString()
  //   )
  //   return {
  //     count: userNoti?.length,
  //     lastMsg: userNoti[userNoti?.length - 1]?.message || null,
  //   }
  // }

  return (
    <div className={styles.box}>
      <LargeCardWithChildren
        wd="488px"
        hg="793px"
        maxw="100%"
        removeMargins={true}
      >
        <div className={styles.wrapper}>
          <div className={styles.chat}>
            <span>Chats</span>
            <span>Video Calls</span>
          </div>
          {allUsers &&
            allUsers?.map((client: IClient) => (
              <React.Fragment key={client.id}>
                <div
                  className={styles.card}
                  onClick={() => selectChat(client)}
                  aria-disabled={false}
                >
                  <div className={styles.left}>
                    <div className={styles.makerelative}>
                      <Avatar
                        src={client?.profileImage}
                        sx={{ width: 69, height: 69 }}
                        alt="avatar"
                      />
                      <span
                        className={styles.circlebadge}
                        style={{
                          background: getBg(
                            statusTracker(onlineUsers, client?.id?.toString())
                          ),
                        }}
                      ></span>
                    </div>
                    <div>
                      <div
                        className={styles.cardname}
                      >{`${client.firstName} ${client.lastName}`}</div>

                      {client?.areaOfSpecialization && (
                        <div className={styles.cardtitle}>
                          {client?.areaOfSpecialization}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* {pickSpecificNotiBasedOnId(client.id)?.count ? (
                  <div className={styles.msg}>
                    <div>
                      {truncateString(
                        pickSpecificNotiBasedOnId(client.id).lastMsg,
                        MAX_LAST_MESSAGE_CHARACTERS
                      )}
                    </div>

                    <div className={styles.noti}>
                      {pickSpecificNotiBasedOnId(client.id)?.count}
                    </div>
                  </div>
                ) : (
                  notificationBySize &&
                  notificationBySize[client.id]?.length && (
                    <div className={styles.msg}>
                      <div>
                        {truncateString(
                          notificationBySize[client.id][
                            notificationBySize[client.id].length - 1
                          ],
                          MAX_LAST_MESSAGE_CHARACTERS
                        )}
                      </div>

                      {notificationBySize &&
                        notificationBySize[client.id]?.length && (
                          <div className={styles.noti}>
                            {chatNotifications[client.id]?.length}
                          </div>
                        )}
                    </div>
                  )
                )} */}
              </React.Fragment>
            ))}
        </div>
      </LargeCardWithChildren>
    </div>
  )
}

export default ChatList
