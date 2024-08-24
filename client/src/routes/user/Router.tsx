import { Route, Routes } from "react-router-dom"
import Auth from "../../pages/auth/Auth"
import Home from "../../pages/home/Home"
import Project from "../../pages/projects/Project"

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Project />} /> 
      </Routes>
    </div>
  )
}

export default Router
