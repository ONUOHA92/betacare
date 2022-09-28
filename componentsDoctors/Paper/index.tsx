import React from 'react'
import styles from './style.module.css'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Paper = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <div {...props} className={`${styles.paper} ${className}`}>
      {children}
    </div>
  )
}

export default Paper
