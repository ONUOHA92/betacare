import styles from './styles.module.css'
import DrugCard from 'componentsDoctors/DrugCard'
import { Pagination } from '@mui/material'

const PharmacyDrugsGrid = () => {
  return (
    <>
      <div className={styles.wrapper}>
        {drugs.map((drug) => (
          <DrugCard key={drug} />
        ))}
      </div>
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
    </>
  )
}
const drugs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export default PharmacyDrugsGrid
