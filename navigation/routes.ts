export const ROUTES = {
  home: '/',
  login: '/login',
  loginDoctor: '/login',
  loginPatient: '/login',
  signUp: '/signup',
  contact: '/contact',
  aboutUs: '/about',
  blog: '/blog',
  aboutUsVideo: 'https://www.youtube.com/watch?v=u8EcERNM77s',
  watchMore: 'https://www.youtube.com/channel/UCuzS5ykGXNZRm55Yd-mRbxg/videos',
}

export const MENU_DROP_DOWM_LINKS = [
  {
    link: ROUTES.contact,
    name: 'contact',
  },
  {
    link: ROUTES.aboutUs,
    name: 'About us',
  },
  //add new links here
  {
    link: ROUTES.watchMore,
    name: 'Watch Demo',
  },
]

export const NAV_LINKS = [
  {
    link: ROUTES.loginPatient,
    name: 'I’m a patient',
  },
  {
    link: ROUTES.loginDoctor,
    name: 'I’m a medical provider',
  },
  //add new links here
  {
    link: ROUTES.signUp,
    name: 'Get Started',
  },
]

export const DRAWER_LINKS = [
  ...NAV_LINKS.slice(0, -1),
  {
    link: ROUTES.blog,
    name: 'Blog',
  },
  //add new links here
  ...MENU_DROP_DOWM_LINKS.slice(0, -1),

  ...MENU_DROP_DOWM_LINKS.slice(-1),
]
