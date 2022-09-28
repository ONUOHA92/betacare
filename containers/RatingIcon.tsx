// import StarIcon from 'components/StarIcon'
import { useMemo } from 'react'

interface Props {
  index?: number
  rating?: number | string
  hoverRating?: number
  onMouseEnter?: (obj: any) => void
  onMouseLeave?: () => void
  onSaveRating?: (obj: any) => void
}

const RatingIcon = ({
  index,
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onSaveRating,
}: Props) => {
  const fill = useMemo(() => {
    if (hoverRating >= index) {
      return 'yellow'
    } else if (!hoverRating && rating >= index) {
      return 'yellow'
    }
    return 'none'
  }, [rating, hoverRating, index])
  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      {
        // <StarIcon fill={fill} />
      }
    </div>
  )
}
export default RatingIcon
