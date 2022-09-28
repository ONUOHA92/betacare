import styles from 'styles/pages/doctors.module.css'
import { MenuItem, Pagination } from '@mui/material'
import PlainTable from 'components/Table'

const PrescriptionList = ({ setState }) => {
  return (
    <>
      <PlainTable
        arrHeaders={arrHeaders}
        arrRows={arrRows}
        setState={setState}
      />
      <div className={styles.counts}>
        <div className={styles.show}>
          <p>Show page 1 of 20</p>
        </div>
        <div className={styles.pagination}>
          <Pagination
            count={7}
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
  )
}

export default PrescriptionList

const arrHeaders = ['Date', 'Who', 'Status', 'Prescription']

const arrRows = [
  {
    date: '7-06-2021',
    who: 'Dr. Teejay',
    status: 'Accepted',
    prescription: 'show',
  },
  {
    date: '7-06-2021',
    who: 'Dr. Teejay',
    status: 'Pending',
    prescription: 'show',
  },
  {
    date: '7-06-2021',
    who: 'Dr. Teejay',
    status: 'Done',
    prescription: 'show',
  },
  {
    date: '7-06-2021',
    who: 'Dr. Teejay',
    status: 'Pending',
    prescription: 'show',
  },
  {
    date: '7-06-2021',
    who: 'Dr. Teejay',
    status: 'Declined',
    prescription: 'show',
  },
  {
    date: '7-06-2021',
    who: 'Dr. Teejay',
    status: 'Done',
    prescription: 'show',
  },
  {
    date: '7-06-2021',
    who: 'Dr. Teejay',
    status: 'Done',
    prescription: 'show',
  },
]
