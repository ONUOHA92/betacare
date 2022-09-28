import styles from './styles.module.css'

const DrugCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src="/images/drugImg.svg" />
      </div>
      <div className={styles.content}>
        <h5 className={styles.name}>Antibacterial handgel</h5>
        <p className={styles.prisize}>
          <span className={styles.price}>₦ 1000.00</span>
          <span className={styles.size}>150 ml</span>
        </p>
      </div>
    </div>
  )
}

export default DrugCard
