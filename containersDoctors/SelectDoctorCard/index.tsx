import Image from 'next/image'
import React from 'react'
import styles from './style.module.css'
import doctor from 'public/images/mock/doctor-girl.png'

const SelectDoctorCard = ({
  setChooseDoctor,
}: {
  setChooseDoctor: Function
}) => {
  const doctors = [
    {
      id: 1,
      image: doctor,
      name: 'Aniebiet Ubaha',
      type: 'Orthopaedic Surgeon',
      charge: '3000.00',
    },
    {
      id: 2,
      name: 'Aniebiet Ubaha',
      image: doctor,
      type: 'Orthopaedic Surgeon',
      charge: '3000.00',
    },
    {
      id: 3,
      name: 'Aniebiet Ubaha',
      image: doctor,
      type: 'Orthopaedic Surgeon',
      charge: '3000.00',
    },
    {
      id: 4,
      name: 'Aniebiet Ubaha',
      image: doctor,
      type: 'Orthopaedic Surgeon',
      charge: '3000.00',
    },
    {
      id: 5,
      name: 'Aniebiet Ubaha',
      image: doctor,
      type: 'Orthopaedic Surgeon',
      charge: '3000.00',
    },
    {
      id: 6,
      name: 'Aniebiet Ubaha',
      image: doctor,
      type: 'Orthopaedic Surgeon',
      charge: '3000.00',
    },
    {
      id: 7,
      name: 'Aniebiet Ubaha',
      image: doctor,
      type: 'Orthopaedic Surgeon',
      charge: '3000.00',
    },
    {
      id: 8,
      name: 'Aniebiet Ubaha',
      image: doctor,
      type: 'Orthopaedic Surgeon',
      charge: '3000.00',
    },
    {
      id: 9,
      name: 'Aniebiet Ubaha',
      image: doctor,
      type: 'Orthopaedic Surgeon',
      charge: '3000.00',
    },
    {
      id: 10,
      name: 'Aniebiet Ubaha',
      image: doctor,
      type: 'Orthopaedic Surgeon',
      charge: '3000.00',
    },
    {
      id: 11,
      name: 'Aniebiet Ubaha',
      image: doctor,
      type: 'Orthopaedic Surgeon',
      charge: '3000.00',
    },
  ]
  return (
    <div className={styles.mainBackground}>
      <div className={styles.headText}>Choose a doctor</div>

      <div className={styles.card}>
        {doctors?.map((doctor) => (
          <div
            key={doctor.id}
            className={styles.doctorCard}
            onClick={() => setChooseDoctor(true)}
          >
            <div className={styles.image}>
              <Image src={doctor.image} alt="doctor profile image" />
            </div>

            <div className={styles.flexify}>
              <span className={styles.name}>{doctor.name}</span>
              <span className={styles.type}>{doctor.type}</span>
            </div>
            <div className={styles.flexify2}>
              <span className={styles.cost}>Appointment Cost</span>
              <span className={styles.charge}>₦{doctor.charge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectDoctorCard
