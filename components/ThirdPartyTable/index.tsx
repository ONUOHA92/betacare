// @ts-nocheck
import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import styles from './style.module.css'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Image from 'next/image'
import Mainland from 'public/images/icons/mainland.svg'
import Laboratory from 'public/images/icons/laboratory.svg'
import Pharmacy from 'public/images/icons/pharmacy.svg'
import { admin_routes } from 'utils/routes'
import Link from 'next/link'

interface Props {
  arrHeaders?: string[]
  arrRows?: any
  headBg?: string
  headClr?: string
  bgClr?: string
  setState?: any
  admin?: boolean
}
const ThirdPartyTable = ({
  arrHeaders,
  arrRows,
  headBg,
  headClr,
  bgClr,
  setState,
  admin,
}: React.PropsWithChildren<Props>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div className={styles.marginlize}>
      <TableContainer
        component={Paper}
        className={styles.tableContainer}
        align="center"
      >
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              {arrHeaders.map((head) => (
                <TableCell key={head} className={styles.head}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {arrRows.map((row, i) => (
              <TableRow key={i}>
                {Object.entries(row).map(([key, value]) => {
                  return (
                    <TableCell className={styles.cell} key={key}>
                      {key === 'company' && (
                        <div className={styles.cellBox}>
                          <Image
                            src={Laboratory}
                            alt=""
                            width={40}
                            height={40}
                          />
                          {value}
                        </div>
                      )}
                      {key === 'category' && (
                        <div className={styles.cellBox}>
                          <Image
                            src={value === 'Laboratory' ? Mainland : Pharmacy}
                            alt=""
                            width={40}
                            height={40}
                          />
                          {value}
                        </div>
                      )}
                      {key !== 'company' && key !== 'category' && value}
                      {key === 'thirdParty' && (
                        <IconButton
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                          className={styles.more}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                      )}
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem>
                          <Link href={admin_routes.ONE_THIRD_PARTY}>View</Link>
                        </MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </Menu>
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ThirdPartyTable
