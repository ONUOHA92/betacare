import Button from 'componentsDoctors/Button'
import DoctorCard from 'componentsDoctors/DoctorCard'

import styles from 'styles/pages/doctors.module.css'
import { MenuItem, Pagination } from '@mui/material'
import { useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Select from 'componentsDoctors/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const DashboardLayout = dynamic(
  () => import('containersDoctors/DashboardLayout'),
  { ssr: false }
)

const options = [
  'Gynaecologist',
  'Paediatrician',
  'Oncologist',
  'Therapist',
  'Orthodontist',
  'Oculist',
  'Psychiatrist',
  'ENT',
  'Dentist',
]

const Doctors = () => {
  const [filter, setFilter] = useState('')
  const [shouldFilter, setShouldFilter] = useState(false)
  const handleChange = (e) => {}

  return (
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
            <FormControl
              sx={{
                minWidth: 270,
                marginInline: '0',
                height: '46px',
                '& .MuiOutlinedInput-input': {
                  boxSizing: 'border-box',
                  height: '47px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14.5px 10px',
                },
              }}
            >
              <InputLabel id="demo-controlled-open-select-label">
                Filter by...
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                onChange={handleChange}
                sx={{ borderRadius: '5px', background: '#fff' }}
                label="Filter by..."
              >
                <MenuItem disabled>Select Type</MenuItem>
                {options.map((option) => (
                  <MenuItem
                    value={option}
                    key={option}
                    sx={{
                      '& .Mui-selected': {
                        color: '#ffffff',
                        backgroundColor: '#1F56C3',
                      },
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button color="primary" wd="133.99px">
              Filter
            </Button>
          </div>
        </header>
        <main className={styles.grid}>
          {DummyDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              image={doctor.image}
              name={doctor.name}
              role={doctor.role}
              ratings={doctor.rating}
              link={doctor.link}
            />
          ))}
        </main>
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
      </div>
    </>
  )
}
Doctors.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Doctors

const DummyDoctors = [
  {
    id: 1,
    image: '/images/anie.png',
    name: 'Aniebiet Ubaha',
    role: 'Orthopaedic Surgeon',
    rating: '4.8',
    link: 'dummy link',
  },
  {
    id: 2,
    image: '/images/anie.png',
    name: 'Aniebiet Ubaha',
    role: 'Orthopaedic Surgeon',
    rating: '4.8',
    link: 'dummy link',
  },
  {
    id: 3,
    image: '/images/anie.png',
    name: 'Aniebiet Ubaha',
    role: 'Orthopaedic Surgeon',
    rating: '4.8',
    link: 'dummy link',
  },
  {
    id: 4,
    image: '/images/anie.png',
    name: 'Aniebiet Ubaha',
    role: 'Orthopaedic Surgeon',
    rating: '4.8',
    link: 'dummy link',
  },
  {
    id: 5,
    image: '/images/anie.png',
    name: 'Aniebiet Ubaha',
    role: 'Orthopaedic Surgeon',
    rating: '4.8',
    link: 'dummy link',
  },
  {
    id: 6,
    image: '/images/anie.png',
    name: 'Aniebiet Ubaha',
    role: 'Orthopaedic Surgeon',
    rating: '4.8',
    link: 'dummy link',
  },
  {
    id: 7,
    image: '/images/anie.png',
    name: 'Aniebiet Ubaha',
    role: 'Orthopaedic Surgeon',
    rating: '4.8',
    link: 'dummy link',
  },
  {
    id: 8,
    image: '/images/anie.png',
    name: 'Aniebiet Ubaha',
    role: 'Orthopaedic Surgeon',
    rating: '4.8',
    link: 'dummy link',
  },
  {
    id: 9,
    image: '/images/anie.png',
    name: 'Aniebiet Ubaha',
    role: 'Orthopaedic Surgeon',
    rating: '4.8',
    link: 'dummy link',
  },
  {
    id: 10,
    image: '/images/anie.png',
    name: 'Aniebiet Ubaha',
    role: 'Orthopaedic Surgeon',
    rating: '4.8',
    link: 'dummy link',
  },
  {
    id: 11,
    image: '/images/anie.png',
    name: 'Aniebiet Ubaha',
    role: 'Orthopaedic Surgeon',
    rating: '4.8',
    link: 'dummy link',
  },
  {
    id: 12,
    image: '/images/anie.png',
    name: 'Aniebiet Ubaha',
    role: 'Orthopaedic Surgeon',
    rating: '4.8',
    link: 'dummy link',
  },
]
