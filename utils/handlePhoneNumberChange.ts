export const handlePhoneOnChange = (value: string | number, state: any) => {
  state(value?.toString())
}
