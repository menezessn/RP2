
import {BrowserRouter, Routes, Route} from "react-router-dom"
import EventListPage from './list_events/EventsListPage'
import CreateEventsPage from './create_event/CreateEventsPage'


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
