import Calendar from '@toast-ui/react-calendar'
import PropTypes from 'prop-types'
import 'tui-calendar/dist/tui-calendar.css'

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'

const CalendarPageWrapper = (props) => {
  return <Calendar {...props} ref={props.forwardedRef} />
}

CalendarPageWrapper.propTypes = {
  props: PropTypes.object,
  forwardedRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
}

export default CalendarPageWrapper
