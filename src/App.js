import './App.css'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/navBar'
import Notes from './components/notes'
import SideBar from './components/sideBar'

function App() {
  return (
    <div className="App">
      <h1>moi :3</h1>
      <NavBar />
      <SideBar />
      <Notes />
    </div>
  )
}

export default App
