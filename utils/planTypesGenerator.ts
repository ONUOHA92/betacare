import { ICurrentPlan } from 'interface/subscription'

export const planAmountGenerator = (type: string) => {
  const newType = type
  if (newType === 'BASIC') {
    return 100
  } else if (newType === 'LITEHEALTH') {
    return 150
  } else if (newType === 'PREMIUM') {
    return 500
  } else if (newType === 'FAMILY') {
    return 2000
  } else {
    return 400
  }
}








export const detectPlanTitle = (currentSubscription: ICurrentPlan) => {
  const lowerCasePlan = currentSubscription?.planType?.toLowerCase()
  if (lowerCasePlan === 'BASIC') {
    return 'BASIC'
  } else if (lowerCasePlan === 'LiteHealth') {
    return 'LiteHealth'
  } else if (lowerCasePlan === 'Premium') {
    return 'Premium'
  } else if (lowerCasePlan === 'Family') {
    return 'Family'
  } else {
    return 'Corporate'
  }
}
