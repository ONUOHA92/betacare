import Image from 'next/image'
import React from 'react'
import styles from './style.module.css'

type Props = {
  name: string
  type: string
  file: string
}

const DoctorDocument = ({
  name,
  type,
  file,
}: React.PropsWithChildren<Props>) => {
  return (
    <>
      {file && (
        <div className={styles.wrapper}>
          <div className={styles.type}>{type}</div>
          <div className={styles.container}>
            <div>
              <Image src={file} alt="uploaded icon" width={100} height={80} />
            </div>
            <div className={styles.title}>
              {name} {type}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DoctorDocument
