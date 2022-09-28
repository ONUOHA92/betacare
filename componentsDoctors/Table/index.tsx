// @ts-nocheck
import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import styles from './style.module.css'
import Button from 'componentsDoctors/Button'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

interface Props {
  arrHeaders?: string[]
  arrRows?: any
  headBg?: string
  headClr?: string
  bgClr?: string
  setState?: any
}

export default function PlainTable({
  arrHeaders,
  arrRows,
  headBg,
  headClr,
  bgClr,
  setState,
}: React.PropsWithChildren<Props>) {
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: headBg ? headBg : '#EDF2FB',
      color: headBg ? headBg : '#333333',
      fontSize: 16,
      fontFamily: 'Poppins',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontFamily: 'Poppins',
      color: bgClr ? bgClr : '#666666',
    },
  }))

  const colorTableStatus = (type: any) => {
    const status = type?.toLowerCase()
    if (status === 'accepted') {
      return '#0ED63A'
    } else if (status === 'pending') {
      return '#FFC107'
    } else if (status === 'done') {
      return '#1F56C3'
    } else {
      return '#E82121'
    }
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)

  const [currentAppointment, setCurrentAppointment] = useState(null)

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    rowId: string
  ) => {
    setAnchorEl(event?.currentTarget)
    setCurrentAppointment(rowId)
  }

  const handleUpdateAppointment = (status: string) => {
    const data = {
      appointmentId: currentAppointment,
      status,
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const popoverId = open ? 'simple-popover' : null

  return (
    <>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            boxShadow: 'none',
            border: '1px solid #E5E5E5',
          },
        }}
      >
        <Typography component={'div'} sx={{ width: 113, height: 150 }}>
          <div className={styles.callFlex}>
            <div
              className={styles.accept}
              onClick={() => handleUpdateAppointment('Pending')}
            >
              Pending
            </div>
            <div
              className={styles.reject}
              onClick={() => handleUpdateAppointment('Approved')}
            >
              Approved
            </div>
            <div
              className={styles.reject}
              onClick={() => handleUpdateAppointment('Declined')}
            >
              Declined
            </div>
            <div
              className={styles.reject}
              onClick={() => handleUpdateAppointment('Done')}
            >
              Done
            </div>
          </div>
        </Typography>
      </Popover>

      <div className={styles.marginlize}>
        <TableContainer
          component={Paper}
          className={styles.tableContainer}
          align="center"
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className={styles.tableHead}>
              <TableRow>
                {arrHeaders.map((head) => (
                  <StyledTableCell key={head} align="center">
                    {head}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {arrRows.map((row, i) => (
                <TableRow key={row.id}>
                  {Object.entries(row).map(([key, value]) => {
                    if (key !== 'id') {
                      return (
                        <>
                          <StyledTableCell
                            key={key}
                            align="center"
                            component="th"
                            scope="row"
                            style={{
                              color:
                                key === 'status'
                                  ? colorTableStatus(row?.status)
                                  : undefined,
                            }}
                          >
                            {value}
                          </StyledTableCell>
                        </>
                      )
                    }
                  })}
                  <TableCell
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      aria-describedby={popoverId}
                      variant="contained"
                      onClick={(event) => handleClick(event, row.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="4"
                        fill="none"
                        viewBox="0 0 16 4"
                      >
                        <path
                          fill="#262626"
                          d="M.125 1.977a1.313 1.313 0 102.625 0 1.313 1.313 0 00-2.625 0zm6.563 0a1.313 1.313 0 102.625 0 1.313 1.313 0 00-2.626 0zm6.562 0a1.313 1.313 0 102.625 0 1.313 1.313 0 00-2.625 0z"
                        ></path>
                      </svg>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}
