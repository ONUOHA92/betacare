export interface IProfileUpdate {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  address?: string
  gender?: string
  imageUrl?: string
  healthInsuranceCompany?: string
  healthInsuranceNumber?: string
}

export interface IProfileMedical {
  bloodGroup?: string
  genotype?: string
  weight?: number
  height?: number
  waist?: number
  chest?: number
}

export interface IProfileIllness {
  illnessType?: string
  details?: string
  diabetesType?: string
  medicationType?: string
  illnessDuration?: string
  severity?: string
  dateOfDiagnosis?: string
  medication?: string
  onMedication?: boolean
  operationProcedure?: string
}

export interface IPeriodTracker {
  lastPeriodStartDate?: string
  menstrualPeriodCycleLength?: number
  menstrualPeriodFlowLength?: number
  nextPeriodStartDate?: string
  weight?: string
  height?: string
}
