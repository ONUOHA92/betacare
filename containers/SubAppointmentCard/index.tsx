import Button from 'components/Button'
import DoctorCard from 'components/DoctorCard'
import DashboardLayout, { TopBarContext } from 'containers/DashboardLayout'
import styles from 'styles/pages/doctors.module.css'
import style from './style.module.css'
import { Pagination } from '@mui/material'
import { SetStateAction, SyntheticEvent, useState } from 'react'
import Head from 'next/head'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import doctor from 'public/images/icons/doctor2.svg'
import LargeCard from 'containers/LargeCard'
import { specialitiesWithAll } from 'utils/utilityTypes'
import { useGetAllDoctors } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsprofile'
import { useFilterDocBySpec } from 'network/ReactQuery/Mutations/Appointment/useAppointment'
const Doctors = () => {
  const [filteredDoctors, setFilteredDoctors] = useState(null)
  const [allDocCurrentPage, setAllDocCurrentPage] = useState(0)
  const { allDoctors } = useGetAllDoctors(allDocCurrentPage)
  return (
    <>
      <TopBarContext.Consumer>
        {(searchedDoctors) => (
          <>
            <Head>
              <title>Doctors | Betacare</title>
            </Head>
            <div className={styles.wrapper}>
              <header>
                <div className={styles.text}></div>
                <div className={style.flexBlock}></div>
              </header>
              {allDoctors?.content?.length > 0 ||
              searchedDoctors?.data?.content?.length > 0 ? (
                <main className={styles.grid}>
                  {searchedDoctors?.data?.content?.length > 0
                    ? searchedDoctors?.data?.content?.map((doctor) => (
                        <DoctorCard
                          key={doctor.id}
                          image={doctor.profilePics}
                          firstName={doctor.firstName}
                          lastName={doctor.lastName}
                          role={doctor.speciality}
                          ratings={doctor.rating}
                          link={doctor.id}
                        />
                      ))
                    : filteredDoctors
                    ? filteredDoctors?.content?.map((doctor) => (
                        <DoctorCard
                          key={doctor.id}
                          image={doctor.profilePics}
                          firstName={doctor.firstName}
                          lastName={doctor.lastName}
                          role={doctor.speciality}
                          ratings={doctor.rating}
                          link={doctor.id}
                        />
                      ))
                    : allDoctors?.content?.map((doctor) => (
                        <DoctorCard
                          key={doctor.id}
                          image={doctor.profilePics}
                          firstName={doctor.firstName}
                          lastName={doctor.lastName}
                          role={doctor.speciality}
                          ratings={doctor.rating}
                          link={doctor.id}
                        />
                      ))}
                </main>
              ) : (
                <LargeCard
                  hg="300px"
                  icon={doctor}
                  text="No Doctors Available"
                />
              )}
              <div className={styles.counts}>
                <div className={styles.show}>
                  <p>
                    Show page 1 of&nbsp;
                    {searchedDoctors?.data?.content?.length > 0
                      ? searchedDoctors?.data?.totalPages
                      : allDoctors?.totalPages}
                  </p>
                </div>
                <div className={styles.pagination}>
                  <Pagination
                    count={
                      searchedDoctors?.data?.content?.length > 0
                        ? searchedDoctors?.data?.totalPages
                        : allDoctors?.totalPages
                    }
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
            </div>
          </>
        )}
      </TopBarContext.Consumer>
    </>
  )
}
Doctors.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Doctors
