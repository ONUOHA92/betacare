// @ts-nocheck
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

interface Props {
  arrHeaders?: string[]
  arrRows?: any
  headBg?: string
  headClr?: string
  bgClr?: string
  setState?: any
  admin?: boolean
  setOpenModal?: (openModal: boolean) => void
  getDetails?: (id: number) => void
}

export default function PlainTable({
  arrHeaders,
  arrRows,
  headBg,
  headClr,
  bgClr,
  setState,
  admin,
  setOpenModal,
  getDetails,
}: React.PropsWithChildren<Props>) {
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      // backgroundColor: headBg ? headBg : '#EDF2FB',
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

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& td, & th': {
      padding: '9px',
      height: '60px',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
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

  return (
    <div className={styles.marginlize}>
      <TableContainer
        component={Paper}
        className={styles.tableContainer}
        align="center"
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead className={styles.tableHead}>
            <TableRow className={styles.headRow}>
              {arrHeaders.map((head) => (
                <StyledTableCell key={head} align="center">
                  {head}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {arrRows.map((row, i) => (
              <StyledTableRow key={i}>
                {Object.entries(row).map(([key, value]) => {
                  return (
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
                      {key !== 'prescription' && key !== 'id' && value}
                      {key === 'prescription' && (
                        <Button
                          color="primary"
                          wd="96px"
                          hg="41px"
                          className={styles.tableButton}
                          onClick={
                            admin
                              ? () => {
                                  console.log(row.id)
                                  setState('requestDetail')
                                  getDetails(row?.id)
                                  setOpenModal(true)
                                }
                              : () => setState('presciptionDetail')
                          }
                        >
                          View
                        </Button>
                      )}
                    </StyledTableCell>
                  )
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
