import Button from 'components/Button'
import DoctorCard from 'components/DoctorCard'
import { TopBarContext } from 'containers/DashboardLayout'
import styles from 'styles/pages/doctors.module.css'
import { Pagination } from '@mui/material'
import { SetStateAction, SyntheticEvent, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import doctor from 'public/images/icons/doctor2.svg'
import LargeCard from 'containers/LargeCard'
import { specialitiesWithAll } from 'utils/utilityTypes'
import { useGetAllDoctors } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsprofile'
import { useFilterDocBySpec } from 'network/ReactQuery/Mutations/Appointment/useAppointment'

const DashboardLayout = dynamic(() => import('containers/DashboardLayout'), {
  ssr: false,
})

const Doctors = () => {
  const [filterValue, setFilterValue] = useState('')
  const [filteredDoctors, setFilteredDoctors] = useState(null)
  const [allDocCurrentPage, setAllDocCurrentPage] = useState(0)
  const { allDoctors } = useGetAllDoctors(allDocCurrentPage)
  const { filterDocBySpecMutation } = useFilterDocBySpec()

  const handleChange = (
    e: SyntheticEvent<Element, Event>,
    newValue: SetStateAction<string>
  ) => {
    setFilterValue(newValue)
  }

  const handleFilter = (e: any) => {
    if (filterValue) {
      const spec = {
        speciality: filterValue as string,
      }

      if (filterValue === 'ALL') {
        setFilteredDoctors(allDoctors)
      } else {
        filterDocBySpecMutation
          .mutateAsync(spec)
          .then((result) => setFilteredDoctors(result?.data))
          .catch((err) => console.log(err))
      }
    }
  }

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
                <div className={styles.text}>
                  <h2>Doctors</h2>
                  <p>Search for doctors near you and get help with anything</p>
                </div>
                <div className={styles.filter}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={specialitiesWithAll}
                    onChange={(event, newValue) =>
                      handleChange(event, newValue)
                    }
                    sx={{
                      minWidth: 270,
                      marginInline: '0',
                      '.css-wb57ya-MuiFormControl-root-MuiTextField-root .MuiOutlinedInput-root':
                        {
                          boxSizing: 'border-box',
                          height: '47px',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0',
                        },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Filter by..." />
                    )}
                  />
                  <Button onClick={handleFilter} color="primary" wd="133.99px">
                    Filter
                  </Button>
                </div>
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
              {/* TO DO PAGINATION */}
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
