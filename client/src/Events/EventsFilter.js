import { useNavigate } from 'react-router-dom';
import './EventsFilter.scss';




export const EventsFilter = ({setEvents}) => {
    const navigate = useNavigate()
    const API_ENDPOINT = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://st-paul-baptist-church.herokuapp.com";


    function handleButtonClick(e) {
        e.preventDefault()
        let month = e.target.value;
        console.log(`clicked on month: ${month}`);
        // let monthNumber = months[month];
        // console.log(`clicked button: ${month} | ${monthNumber}`);
        
    
        fetch(`${API_ENDPOINT}/api/events?month=${month}`)
            .then((res) => res.json())
            .then(events => setEvents(events))
            .then(navigate(`/events`))
    } 

    let past5 = new Date();
      let currentMonth = past5.getMonth();
      let currentAbsMonth = past5.getFullYear() * 12 + currentMonth;

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

    let allMonths = Array.from({length: 19}, (_, offset) => {
        console.log(`offset: ${offset}`);
        return currentAbsMonth - 7 + offset
      }
      );

    let eventMonthOptions = allMonths.map(absMonth =>
        monthNames[absMonth % 12] + " " + Math.floor(absMonth / 12) 
    );
                 

    return <div className="events-filters">
        {eventMonthOptions.map((month) => {
            return <button className='events-filters-button' value={month} onClick={handleButtonClick}>{month}</button>
        })}
    </div>
}