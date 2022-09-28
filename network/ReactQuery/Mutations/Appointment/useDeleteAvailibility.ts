import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { ErrorMsgDefault } from 'constants/constants'
import { removeDoctorsAvailibily } from 'network/Services/Mutations/appointment'
import { toast } from 'react-toastify';


export const useDoctorRemoveAvailability = () => {
    const [doctorAvailibityRemoveError, setDoctorAvailibityRemoveError] = useState('')
    const removeDoctorsAvailibilyMutation = useMutation(removeDoctorsAvailibily,
        {
            onSuccess: (data) => {
                const { data: info }: any = data
                toast.success(info?.message)
            },
            onError: (error: Record<any, any>) => {
                const errMsg = error?.response?.data?.message || ErrorMsgDefault
                setDoctorAvailibityRemoveError(errMsg)
                toast.error(errMsg)
            },
        }
    )

    const {
        mutateAsync: removeDoctor,
        isLoading: removeDoctorsAvailibilyisLoading,
        isSuccess: removeDoctorsAvailibilyisSuccess,
    } = removeDoctorsAvailibilyMutation

    return {
        removeDoctor,
        removeDoctorsAvailibilyisLoading,
        removeDoctorsAvailibilyisSuccess,
        doctorAvailibityRemoveError
    }

}