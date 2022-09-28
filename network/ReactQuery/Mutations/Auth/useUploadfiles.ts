import {
  signUpService,
  uploadFileService,
} from 'network/Services/Mutations/auth'
import React from 'react'
import { useMutation } from 'react-query'

export const useUploader = () => {
  const filesUploadMutation = useMutation(uploadFileService, {
    onSuccess: (data) => {},
    onError: (error: Record<any, any>) => {
      console.log(error)
    },
  })

  const { mutate, isLoading: isUploadingFile, isSuccess } = filesUploadMutation

  return { filesUploadMutation, isUploadingFile, isSuccess }
}
