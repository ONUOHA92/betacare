export const getIllnessBasedOnType = (array: [], criteria: string) => {
  const savedData = array
    ? array?.find(
        (specificIllness) => (specificIllness as any).illnessType === criteria
      )
    : null
  return savedData
}
