import React, { useState } from "react";
import './style.css'
type PropsType = {
    show:boolean;
    handleClose:()=>void;
    handleCreate:(project:string)=>void;
    setTrigger?:React.Dispatch<React.SetStateAction<boolean>>
}

const ProjectModal = ({ show, handleClose, handleCreate, setTrigger }:PropsType) => {
    const [project,setProject] = useState<string>('');
  return (
    show && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{marginBottom:'20px'}}>Create Project</h2>
            <label htmlFor="project-name">Enter Project Name:</label>
            <input type="text" id="project-name" placeholder="Type here" value={project} onChange={(e) => setProject(e.target.value)}/>
            <p className="error-message" style={{color:'red',textAlign:'start'}}>Project Name Can't be empty</p>
            <div className="modal-actions">
              <button className="cancel-button" onClick={handleClose} style={{width:'130px','background':'none',color:'red'}}>Cancel</button>
              <button className="create-button" onClick={() => {handleCreate(project),handleClose(),setTrigger && setTrigger((prev)=>!prev)}} style={{width:'130px',backgroundColor:'#7E22CE'}}>Create</button>
            </div>
          </div>
        </div>
      )
  )
}

export default React.memo(ProjectModal);
