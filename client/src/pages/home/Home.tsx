import { useState } from "react";
import ProjectHeader from "../../components/headers/ProjectHeader";
import dispImg from "../../assets/images/Group 16.png";
import ModalHoc, { HocPropsType } from "../../components/hoc/ModalHoc";
import ProjectModal from "../../components/modals/ProjectModal";

import CreateBtn from "../../components/buttons/CreateBtn";
import { handleCreate } from "../../utils/actions";
const Home = ({ show, setShow, handleClose }: HocPropsType) => {


  return (
    <section className="container">
      <ProjectHeader />
      <section className="home-section">
        <h1>Create a New Project</h1>
        <div className="home-img">
          <img src={dispImg} alt="displayImage" />
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in
        </p>
        <CreateBtn setShow={setShow} />
        <ProjectModal
          show={show}
          handleClose={handleClose}
          handleCreate={handleCreate}
        />
      </section>
    </section>
  );
};

export default ModalHoc(Home);
