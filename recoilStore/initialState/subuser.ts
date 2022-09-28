import { ISubUser } from 'interface/subuser'

export const subUserCredential: ISubUser | null = {
  subUsers: [
    {
      id: 1,
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      subUser: {
        id: 0,
        email: '',
        activated: false,
        deleted: false,
        emailVerified: false,
        imageUrl: '',
        resetDate: new Date(),
        otp: '',
        verificationOtp: '',
        userType: '',
        otpCreatedAt: 0,
        verificationOtpCreatedAt: 0,
      },
    },
  ],
}
