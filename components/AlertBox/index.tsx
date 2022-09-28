import React from 'react'
import styles from './style.module.css'

type Props = {
  type: 'error' | 'warning' | 'success'
}

const AlertBox = ({ type, children }: React.PropsWithChildren<Props>) => {
  return (
    <div className={`${styles.box} box`}>
      <p>{children}</p>
      <style jsx>
        {`
          .box {
            background: ${type === 'error'
              ? 'rgba(255, 89, 94, 0.1)'
              : type === 'warning'
              ? 'rgba(253, 208, 50, 0.1)'
              : '#a5d6a7'};
          }
        `}
      </style>
    </div>
  )
}

export default AlertBox
