// Write your code here <ul className="appointments-list"></ul>
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: 'dd-mm-yyyy',
    starred: false,
    appointmentsList: [],
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {id: uuidv4(), title, date, isStarred: false}
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: 'dd-mm-yyyy',
    }))
  }

  onClickStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onClickStarred = () => {
    this.setState(prevState => ({
      starred: !prevState.starred,
    }))
  }

  render() {
    const {starred, appointmentsList} = this.state
    const renderAppointmentsList = starred
      ? appointmentsList.filter(each => each.isStarred === true)
      : appointmentsList
    const isFiltered = starred ? 'filtered-btn' : ''

    return (
      <div className="bg">
        <div className="appointment-card">
          <div className="add-appointment-container">
            <form
              className="appointment-input-container"
              onSubmit={this.onSubmit}
            >
              <h1 className="appointment-heading">Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date">DATE</label>
              <input type="date" id="date" onChange={this.onChangeDate} />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <div className="img-container">
              <img
                className="image"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="appointments-container">
            <div className="appointments-header">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                className={`filter-btn ${isFiltered}`}
                type="button"
                onClick={this.onClickStarred}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {renderAppointmentsList.map(each => (
                <AppointmentItem
                  appointmentDetails={each}
                  key={each.id}
                  onClickStar={this.onClickStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
