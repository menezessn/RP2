
import {BrowserRouter, Routes, Route} from "react-router-dom"
import EventListPage from './EventsListPage'
import CreateEventsPage from './CreateEventsPage'


function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EventListPage/>}/>
          <Route path="/create" element={<CreateEventsPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
