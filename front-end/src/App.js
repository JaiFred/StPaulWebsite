import logo from './logo.svg';
import react, {useState, useEffect} from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'

import ChurchLandingAttributes from './ChurchLanding';
import EventsContainer from './EventsContainer';
import NavBar from './Navbar';

import './App.css';

function App() {
  const [authChecked, setAuthChecked] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  
  // const [home, setHome] = useState ([])
  

  console.log(currentUser)

  // useEffect(() => {
  //   fetch('/me', {
  //     credentials: 'include'
  //   })
  //   .then((res) => res.json())
  //   .then((home) => setCurrentUser(home));
  //   })

  useEffect(() => {
    fetch('/user', {
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          res.json().then(user => {
            setCurrentUser(user)
            setAuthChecked(true)
          })
        } else {
          setAuthChecked(true)
        }
        console.log(authChecked)
     })
  }, [])

  return (
    <div className="App">
            <hr />
      <NavBar />
      hello
        <Routes>      
          <Route path='/' element={<ChurchLandingAttributes />} />  
          <Route path='/events' element={<EventsContainer/>}/>
          {/* <Route exact path='/about_us' component={AboutUsContainer} /> */}
        </Routes>
    </div>
  );
}

export default App;


{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
