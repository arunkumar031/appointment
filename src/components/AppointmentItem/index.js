// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onClickStar} = props
  const {id, title, date, isStarred} = appointmentDetails
  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickStarBtn = () => {
    onClickStar(id)
  }

  const starUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item">
      <div className="title-container">
        <p className="title">{title}</p>
        <button type="button" data-testid="star" onClick={onClickStarBtn}>
          <img className="star" src={starUrl} alt="star" />
        </button>
      </div>
      <p className="date">{formattedDate}</p>
    </li>
  )
}

export default AppointmentItem
