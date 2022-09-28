import * as React from 'react'
import styles from './style.module.css'
import Button from 'components/Button'

interface Props {
  active?: boolean
}

const EmergencyCard = ({ active }: React.PropsWithChildren<Props>) => {
  return (
    <div className={styles.smallWell}>
      <span>Teejay Teko</span>
      <div>
        <Button
          wd="95px"
          hg="39px"
          color={active ? 'primary' : 'tertiary'}
          className={`${styles.dbtn}`}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}

export default EmergencyCard
