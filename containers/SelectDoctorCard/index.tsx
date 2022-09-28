import Image from 'next/image'
import React, { useEffect } from 'react'
import styles from './style.module.css'
import doctor from 'public/images/mock/doctor-girl.png'
import toInitials from 'utils/toInitials'
import { toFullName } from 'utils/toFullName'
import LargeCard from 'containers/LargeCard'
import doctor2 from 'public/images/icons/doctor2.svg'
import { Content, IFilterDoctorBySpecResponse } from 'interface/appointment'
import { useRecoilState } from 'recoil'
import { getDoctorIdAtom } from 'recoilStore/Atoms/appointmentAtom'

const SelectDoctorCard = ({
  setChooseDoctor,
  allDoctors,
  setRenderComp,
}: {
  setChooseDoctor: Function
  allDoctors: IFilterDoctorBySpecResponse
  setRenderComp: (id: any) => void
}) => {
  const [currentId, setCurrentId] = useRecoilState(getDoctorIdAtom)
  const handleClick = (doctor: Content) => {
    setRenderComp(doctor?.id)
    setCurrentId({
      id: doctor?.id,
    })
    setChooseDoctor(doctor?.id)
  }

  return (
    <div className={styles.mainBackground}>
      <div className={styles.headText}>Choose a doctor </div>
      {allDoctors?.content?.length > 0 ? (
        <div className={styles.card}>
          {allDoctors?.content.map((doctor) => (
            <div
              key={doctor.id}
              className={`${styles.doctorCard} ${styles.doctorCardOnLoad}`}
              onClick={(e) => handleClick(doctor)}
            >
              {!doctor.profilePics && (
                <div className={styles.imageText}>
                  <p>
                    {toInitials(
                      toFullName({
                        firstName: doctor.firstName,
                        lastName: doctor.lastName,
                      })
                    )}
                  </p>
                </div>
              )}
              {doctor.profilePics !== 'tayo.jpg' &&
                doctor?.profilePics !== null &&
                doctor?.profilePics?.length >= 10 && (
                  <div className={styles.image}>
                    <Image
                      src={doctor.profilePics}
                      alt="doctor profile image"
                      width="70px"
                      height="70px"
                    />
                  </div>
                )}

              <div className={styles.flexify}>
                <span className={styles.name}>
                  {toFullName({
                    firstName: doctor.firstName,
                    lastName: doctor.lastName,
                  })}
                </span>
                <span className={styles.type}>{doctor.speciality}</span>
              </div>
              <div className={styles.flexify2}>
                <span className={styles.cost}>Appointment Cost</span>
                <span className={styles.charge}>
                  ₦{doctor.appointmentCost || 0.0}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <LargeCard hg="300px" icon={doctor2} text="No Doctors Available" />
      )}
    </div>
  )
}

export default SelectDoctorCard
