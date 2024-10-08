import { Route, Routes } from "react-router-dom";
import Auth from "../../pages/auth/Auth";
import Home from "../../pages/home/Home";
import Project from "../../pages/projects/Project";
import Upload from "../../pages/uploads/Upload";
import PrivateRoute from "../PrivateRoute";
import PublicRoute from "../PublicRoute";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Auth />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/uploads/:project" element={<Upload />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
