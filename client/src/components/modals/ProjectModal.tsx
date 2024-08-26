import React, { useState } from "react";
import "./style.css";
import { useAppSelector } from "../../app/hooks";
type PropsType = {
  show: boolean;
  handleClose: () => void;
  handleCreate: (project: string,token:string|null) => void;
  setTrigger?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectModal = ({
  show,
  handleClose,
  handleCreate,
  setTrigger,
}: PropsType) => {
  const [project, setProject] = useState<string>("");
  const {token} = useAppSelector(data => data.user);
  const handleCreateProject = async () => {
    if (project.trim() === "") {
      console.error("Project Name can't be empty");
      return;
    }

    await handleCreate(project,token);

    // Close the modal
    handleClose();

    // Trigger a re-fetch of the project list if setTrigger is provided
    if (setTrigger) {
      setTrigger(prev => !prev);
    }
  };

  return (
    show && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 style={{ marginBottom: "20px" }}>Create Project</h2>
          <label htmlFor="project-name">Enter Project Name:</label>
          <input
            type="text"
            id="project-name"
            placeholder="Type here"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
          <p
            className="error-message"
            style={{ color: "red", textAlign: "start" }}
          >
            Project Name Can't be empty
          </p>
          <div className="modal-actions">
            <button
              className="cancel-button"
              onClick={handleClose}
              style={{ width: "130px", background: "none", color: "red" }}
            >
              Cancel
            </button>
            <button
              className="create-button"
              onClick={handleCreateProject}
              style={{ width: "130px", backgroundColor: "#7E22CE" }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default React.memo(ProjectModal);
