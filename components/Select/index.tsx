import React from 'react'
import { Select, MenuItem, SelectProps } from '@mui/material'
import styles from './style.module.css'

interface Props extends SelectProps {
  options?: string[]
  topLabel?: string
  wd?: string
  mcolor?: string
  br?: string
}

const index = ({
  options,
  topLabel,
  children,
  wd,
  mcolor,
  br,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <>
      <Select
        sx={{
          width: wd || '100%',
          height: '45px',
          borderRadius: br || '5px',
          backgroundColor: mcolor || '#fafafa',
          color: '#999999',
          fontSize: '14px',
        }}
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        {...props}
      >
        {children}
      </Select>
    </>
  )
}

export default index
