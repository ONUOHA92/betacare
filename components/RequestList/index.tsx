import styles from 'styles/pages/doctors.module.css'
import { MenuItem, Pagination } from '@mui/material'
import PlainTable from 'components/Table'
import { getDoctorDetailsService } from 'network/Services/Queries/admin'

const RequestList = ({
  setState,
  setOpenModal,
  doctorSignupLogs,
  setDoctorDetails,
}) => {
  const getDetails = (id: number) => {
    getDoctorDetailsService(id).then((res) => {
      console.log('res', res)
      setDoctorDetails(res.data)
    })
  }

  return (
    <>
      <PlainTable
        arrHeaders={arrHeaders}
        arrRows={doctorSignupLogs}
        setState={setState}
        admin={true}
        setOpenModal={setOpenModal}
        getDetails={getDetails}
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

export default RequestList

const arrHeaders = ['Date', 'Email', 'Phone Number', 'Time', 'Action', '']
