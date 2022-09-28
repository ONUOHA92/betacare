export const shallowPush = (type: string, router: any) => {
  router.push(`/doctors/messages/?${type}=true`, undefined, {
    shallow: true,
  })
}
export const patientShallowPush = (type: string, router: any) => {
  router.push(`/patients/messages/?${type}=true`, undefined, {
    shallow: true,
  })
}

export const doctorSignupShallowPush = (type: string, router: any) => {
  router.push(`/signup/doctor?step=${type}`, undefined, {
    shallow: true,
  })
}
