import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import styles from './style.module.css'
import Button from 'components/Button'
import { toFullName } from 'utils/toFullName'
import { IconButton, Menu, MenuItem, Pagination } from '@mui/material'
import { MoreHorizRounded } from '@mui/icons-material'

interface Props {
  arrHeaders?: string[]
  arrRows?: any
  headBg?: string
  headClr?: string
  bgClr?: string
  setState?: any
  setAppointmentId?: (id: number) => void
  handleCancelCTA?: any
  setPageNumber?: Function
}

export default function AppointmentTable({
  arrHeaders,
  arrRows,
  headBg,
  headClr,
  bgClr,
  setState,
  handleCancelCTA,
  setAppointmentId,
  setPageNumber,
}: React.PropsWithChildren<Props>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAppointmentId(row?.id)
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const cellStyle = {
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
  }

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
  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    setPageNumber(page - 1)
  }

  return (
    <div className={styles.marginlize}>
      <>
        {/* @ts-ignore:next-line */}
        <TableContainer
          component={Paper}
          className={styles.tableContainer}
          align="center"
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className={styles.tableHead}>
              <TableRow
                sx={{
                  '& td, & th': {
                    padding: '9px',
                    height: '60px',
                  },
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}
              >
                {arrHeaders.map((head) => (
                  <TableCell sx={cellStyle} key={head} align="center">
                    {head}
                  </TableCell>
                ))}
                <TableCell sx={cellStyle} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arrRows?.content.map((row, i) => (
                <TableRow
                  sx={{
                    '& td, & th': {
                      padding: '9px',
                      height: '60px',
                    },
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                  key={i}
                >
                  <TableCell
                    sx={cellStyle}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    {new Date(row?.appointmentDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell
                    sx={cellStyle}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    Dr.{' '}
                    {toFullName({
                      firstName: row?.doctor?.firstName,
                      lastName: row?.doctor?.lastName,
                    })}
                  </TableCell>

                  <TableCell
                    sx={cellStyle}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    {row?.appointmentTime}
                  </TableCell>

                  <TableCell
                    sx={cellStyle}
                    align="center"
                    component="th"
                    scope="row"
                    style={{
                      color: colorTableStatus(row?.appointmentStatus),
                    }}
                  >
                    {row?.appointmentStatus}
                  </TableCell>
                  <TableCell
                    sx={cellStyle}
                    align="center"
                    component="th"
                    scope="row"
                    style={{
                      color: colorTableStatus(row?.appointmentStatus),
                    }}
                  >
                    <IconButton
                      disabled={
                        row?.appointmentStatus === 'DONE' ||
                        row?.appointmentStatus === 'ACCEPTED' ||
                        row?.appointmentStatus === 'CANCELLED'
                      }
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={(e) => handleClick(e, row)}
                    >
                      <MoreHorizRounded />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleCancelCTA()
                          handleClose()
                        }}
                      >
                        Cancel Appointment
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>{' '}
        </TableContainer>
        <div className={styles.counts}>
          <div className={styles.show}>
            <p>Show page 1 of {arrRows?.totalPages}</p>
          </div>
          <div className={styles.pagination}>
            <Pagination
              count={arrRows?.totalPages}
              onChange={handlePaginationChange}
              shape="rounded"
              siblingCount={0}
              size="small"
              sx={{
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: '#D4D5DB',
                },
                '& .MuiPaginationItem-root': {
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  fontWeight: '300',
                  lineHeight: '21px',
                },
              }}
            />
          </div>
        </div>
      </>
    </div>
  )
}
