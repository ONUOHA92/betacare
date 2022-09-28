import userSubAdminIcon from 'public/images/icons/user_sub_admin.svg'
import userAdminIcon from 'public/images/icons/user_admin_icon.svg'
import doctorsIcon from 'public/sidebaricons/doctors.svg'
import activitiesIcon from 'public/sidebaricons/activities.svg'
import homeIcon from 'public/images/icons/home.svg'
import labIcon from 'public/sidebaricons/lab.svg'
import logoutIcon from 'public/sidebaricons/logout.svg'
import messagesIcon from 'public/images/icons/messages 2.svg'
import appointmentsIcon from 'public/images/icons/plus-sign 2.svg'
import prescriptionsIcon2 from 'public/sidebaricons/prescription2.svg'
import settingsIcon from 'public/sidebaricons/settings.svg'
import pharmacyIcon from 'public/sidebaricons/pharmacy.svg'
import { admin_routes, routes_doctor } from 'utils/routes'
import { SideBarLink } from 'interface/sidebar'

export const sideBarLinks: SideBarLink[] = [
  {
    name: 'Home',
    icon: homeIcon,
    link: routes_doctor.DOCTORS_HOME,
  },
  {
    name: 'Appointments',
    icon: appointmentsIcon,
    link: routes_doctor.DOCTORS_APPOINTMENTS,
  },
  {
    name: 'Messages',
    icon: messagesIcon,
    link: routes_doctor.DOCTORS_MESSAGES,
  },
  {
    name: 'Laboratory',
    icon: labIcon,
    link: routes_doctor.DOCTORS_LABORATORY,
  },
  {
    name: 'Prescriptions',
    icon: prescriptionsIcon2,
    link: routes_doctor.DOCTORS_PRESCRIPTIONS,
  },
  {
    name: 'Pharmarcy',
    icon: pharmacyIcon,
    link: routes_doctor.DOCTORS_PHARMACY,
  },

  {
    name: 'Activities',
    icon: activitiesIcon,
    link: routes_doctor.DOCTORS_ACTIVITIES,
  },
]

export const sideBarLower: SideBarLink[] = [
  {
    name: 'Settings',
    icon: settingsIcon,
    link: routes_doctor.DOCTORS_SETTINGS,
  },
  {
    name: 'Log-out',
    icon: logoutIcon,
    link: routes_doctor.DOCTORS_LOGOUT,
  },
]

export const adminSideBarLinks: SideBarLink[] = [
  {
    name: 'Home',
    icon: homeIcon,
    link: admin_routes.HOME,
  },
  {
    name: "Doctor's request",
    icon: doctorsIcon,
    link: admin_routes.REQUEST,
  },
  {
    name: 'Third party user',
    icon: userAdminIcon,
    link: admin_routes.THIRD_PARTY,
  },
  {
    name: 'Sub Admins',
    icon: userSubAdminIcon,
    link: admin_routes.SUB_ADMIN,
  },
  {
    name: 'Activities',
    icon: activitiesIcon,
    link: admin_routes.ACTIVITIES,
  },
]

export const adminSideBarLower: SideBarLink[] = [
  {
    name: 'Settings',
    icon: settingsIcon,
    link: admin_routes.SETTINGS,
  },
  {
    name: 'Log-out',
    icon: logoutIcon,
    link: admin_routes.LOGOUT,
  },
]
