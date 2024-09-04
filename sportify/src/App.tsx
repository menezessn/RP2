import {BrowserRouter, Routes, Route} from "react-router-dom"
import EventListPage from './list_events/EventsListPage'
import CreateEventsPage from './create_event/CreateEventsPage'
import EventsMap from './events_map/EventsMap'

function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EventListPage/>}/>
          <Route path="/create" element={<CreateEventsPage/>}/>
          <Route path="/map" element={<EventsMap/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
