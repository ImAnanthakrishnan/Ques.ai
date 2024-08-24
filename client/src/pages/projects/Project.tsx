import ProjectHeader from "../../components/headers/ProjectHeader";
import CreateBtn from "../../components/buttons/CreateBtn";
import ModalHoc, { HocPropsType } from "../../components/hoc/ModalHoc";
import ProjectModal from "../../components/modals/ProjectModal";
import { handleCreate } from "../../utils/actions";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

type Projects = {
  _id: string;
  name: string;
  episodes: string[];
  updatedAt: Date;
};

const Project = ({ show, setShow, handleClose }: HocPropsType) => {
    const [triggerFetch,setTriggerFetch] = useState<boolean>(false);
  const { datas, loading, error } = useFetch<Projects>("/project",triggerFetch);
  return (
    <section className="">
      <ProjectHeader />
      <div className="project-top">
        <h1>Projects</h1>
        <CreateBtn setShow={setShow} />
      </div>
      <section className="projects">
        {datas.map((item) => (
          <div className="projects-inner" key={item._id}>
            <h1 className="projects-color">{item.name[0]}{item.name[1]}</h1>

            <h4 className="name">{item.name}</h4>
            <p className="episode">{item.episodes.length} Episodes</p>
            <p className="last-edited">Last edited</p>
          </div>
        ))}
      </section>
      <ProjectModal
        show={show}
        handleClose={handleClose}
        handleCreate={handleCreate}
        setTrigger = {setTriggerFetch}
      />
    </section>
  );
};

export default ModalHoc(Project);
