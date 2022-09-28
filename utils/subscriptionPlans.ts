export const basicPlan = [
  'Unlimited access to BetaCare Webapp and features',
  'Unlimited access to specialist doctors and practitioners',
  'Doctor consultations via Chats, Video and Audio (PAYG)',
  '24/7 Customer Support',
  'Free drug prescriptions',
  'Doorstep drug delivery'
]

export const accessPlan = [
  '1/3 days access to Betacare webapp and features ',
  '1 free doctor consultation via Chats, Video and Audio calls',
  '1/3 days unlimited Access to specialist doctors',
  'Doctor consultations via Chats, Video and Audio Calls (PAYG)',
  'Unlimited access to Betacare web app and features',
  '24/7 Customer Support',
  'Free drug prescriptions',
  'Doorstep drug delivery'
]

export const weeklyPlan = [
  '1 week unlimited access to Betacare webapp and features ',
  '1 week unlimited access to specialist doctors',
  '1 free doctor consultation via Chats, Video and Audio calls ',
  'Doctor consultations via Chats, Video and Audio Calls (PAYG)',
  'Unlimited access to Betacare web app and features',
  '24/7 Customer Support',
  'Free drug prescriptions',
  'Doorstep drug delivery'
]

export const monthlyPlan = [
  '1 month unlimited access to Betacare web app and features ',
  '1 month unlimited access to specialist doctors',
  'Doctor Consultations via Chats, Video and Audio calls (PAYG)',
  '2 free doctor consultation via Chats, Video and Audio calls ',
  'Unlimited access to Betacare web app and features',
  '24/7 Customer Support',
  'Free drug prescriptions',
  'Doorstep drug delivery',
  '5% discount on consultations and labs (applies after 5 doctor consultations using PAYG)'
]

export const monthlyFamilyPlan = [
  '1 month unlimited access to Betacare web app and features',
  '1 month unlimited access to specialist doctors',
  'Doctor consultations via Chats, Video and Audio calls (PAYG)',
  '8 free doctor consultations via Chats, Video and Audio calls  (Across all users)',
  'Unlimited access to Betacare web app and features',
  '24/7 Customer Support',
  'Free drug prescriptions',
  'Doorstep drug delivery',
  '10% discount on consultations and labs  (applies after 5 doctor consultations using PAYG)'
]

export const corporateMonthlyPlan = [
  '1 month unlimited access to Betacare web app and features',
  'Sub user management ',
  'Unlimited access to specialist doctors ',
  'Doctor consultations via Chats, Video and Audio calls (PAYG)',
  '2 free doctor consultation via Chats, Video and Audio calls ',
  '24/7 Customer Support',
  'Free drug prescriptions',
  'Doorstep drug delivery',
  'Emergency care (urgent requests for consultations)',
  '5% discount on consultations and labs (applies after 5 doctor consultations using PAYG)'

]

export const differentSubPlans = [
  {
    title: 'Starters',
    desc: 'Maximum 1 user',
    amount: '0.00',
    pkg: basicPlan,
    id: 1,
  },
  {
    title: 'Basic Daily',
    desc: 'Maximum 1 user',
    amount: '100.00',
    pkg: accessPlan,
    id: 2,
  },

  {
    title: 'LiteHealth',
    desc: 'Maximum 1 user',
    amount: '150.00',
    pkg: weeklyPlan,
    id: 3,
  },

  {
    title: 'Premium',
    desc: 'Maximum 1 user',
    amount: '500.00',
    pkg: monthlyPlan,
    id: 4,
  },
  {
    title: 'Family',
    desc: '1-5 Capacity Users',
    amount: '2,000.00',
    pkg: monthlyFamilyPlan,
    id: 5,
  },
  {
    title: 'Corporate',
    desc: '1-10,000 users',
    amount: '400.00',
    pkg: corporateMonthlyPlan,
    id: 6,
  },

]
