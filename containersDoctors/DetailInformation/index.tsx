import Input from 'componentsDoctors/Input'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  useGetBanks,
  useGetBankDetails,
} from 'network/ReactQuery/Queries/Bank/useAllBanks'
import styles from './style.module.css'
import Button from 'componentsDoctors/Button'
import { MenuItem, Select } from '@mui/material'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'

import {
  useVerifyBankDetails,
  useUpdateBankDetails,
} from 'network/ReactQuery/Mutations/Bank/useUpdateBankDetails'
import { isBlankOrUndefined } from 'utils/isBlank'

const DetailInformation = () => {
  const { banks } = useGetBanks()
  const { bankDetails, refetchBankDetails } = useGetBankDetails()
  const { verifyBankDetails, verifyBankDetailsError, accountDetails } =
    useVerifyBankDetails()

  const {
    updateBankDetails,
    updateBankDetailsLoading,
    updateBankDetailsSuccess,
    updateBankDetailsError,
  } = useUpdateBankDetails()
  const formik = useFormik({
    initialValues: {
      bankName: bankDetails?.bankName ?? '',
      accountNumber: bankDetails?.accountNumber ?? '',
      accountName: bankDetails?.accountName ?? '',
    },
    onSubmit: (values) => {
      const credentials = {
        bankName: values.bankName,
        accountNumber: values.accountNumber,
        accountName: values.accountName,
      }
      updateBankDetails(credentials)
      setTimeout(() => {
        refetchBankDetails()
      }, 1000)
    },
    validationSchema: Yup.object({
      accountNumber: Yup.number().required('Account Number is required'),
      accountName: Yup.string().required('Account Name is required'),
      bankName: Yup.string().required('Bank Name is required'),
    }),
  })
  const { setFieldValue, dirty } = formik
  useEffect(() => {
    setFieldValue('accountName', accountDetails?.accountName)
  }, [accountDetails, setFieldValue])
  useEffect(() => {
    if (
      !isBlankOrUndefined(formik.values.bankName) &&
      !isBlankOrUndefined(formik.values.accountNumber) &&
      formik.values.accountNumber.toString().length === 10 &&
      dirty
    ) {
      verifyBankDetails({
        bankName: formik.values.bankName,
        accountNumber: formik.values.accountNumber,
      })
    }
  }, [
    formik.values.bankName,
    formik.values.accountNumber,
    verifyBankDetails,
    dirty,
  ])
  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {updateBankDetailsError && (
          <Alert severity="error">
            {updateBankDetailsError || 'Something went wrong'}
          </Alert>
        )}
        {updateBankDetailsSuccess && (
          <Alert severity="success">Bank details updated successfully</Alert>
        )}
      </Stack>
      <div className={styles.formContainer}>
        <form
          className={styles.formContainerForm}
          onSubmit={formik.handleSubmit}
        >
          <div className={styles.formTopp}></div>
          <div className={styles.relationship}>
            <div className={styles.addMarginDi}>Bank name</div>
            <Select
              value={formik.values.bankName}
              onChange={formik.handleChange}
              inputProps={{ 'aria-label': 'Without label' }}
              fullWidth
              id="bankName"
              name="bankName"
              displayEmpty
              style={{ width: '100%', borderRadius: '6px', outline: 'none' }}
            >
              <MenuItem value="">
                <span className={styles.placeholder}>Select one</span>
              </MenuItem>
              {banks?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>
          <br />
          <Input
            label="Account number"
            placeholder="123456789"
            id="accountNumber"
            name="accountNumber"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
          />
          <br />
          {verifyBankDetailsError && (
            <Alert severity="error">Error getting Accountname</Alert>
          )}

          <Input
            label="Account Name"
            placeholder="Teejay Teko"
            id="accountName"
            name="accountName"
            value={formik.values.accountName}
            onChange={formik.handleChange}
            disabled
          />
          <Button
            type="submit"
            hg="50px"
            color="secondary"
            className={styles.presBtn}
            disabled={!formik.isValid || formik.isSubmitting}
            isLoading={updateBankDetailsLoading}
          >
            Edit
          </Button>
        </form>
      </div>
    </>
  )
}

export default DetailInformation
