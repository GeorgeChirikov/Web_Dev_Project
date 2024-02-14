import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/navBar'
import Home from './components/home'
import SideBar from './components/sideBar'
import NotFound from './components/notFound'
import Notes from './components/notes'
import NoteFolders from './components/noteFolders'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideBar />
        <div className="flex-container">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notefolders" element={<NoteFolders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
