import React, { useState } from "react";
import "./style.css";
import { useAppSelector } from "../../app/hooks";
type PropsType = {
  show: boolean;
  handleClose: () => void;
  handleUpload: (inputData: { name: string; link: string },project?:string,token?:string|null) => void;
  text: string;
  img: string;
  project?:string;
  setTrigger?:React.Dispatch<React.SetStateAction<boolean>>
  setClick: React.Dispatch<React.SetStateAction<boolean>>
};

type InputType = {
  name: string;
  link: string;
};

const UploadModal = ({
  show,
  handleClose,
  handleUpload,
  text,
  img,
  project,
  setTrigger,
  setClick
}: PropsType) => {
  const [inputData, setInputData] = useState<InputType>({
    name: "",
    link: "",
  });
 const {token} = useAppSelector(data => data.user);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUploadClick = async () => {
    if (inputData.name.trim() === "" || inputData.link.trim() === "") {
      console.error("Both name and link are required");
      return;
    }
      
      await handleUpload(inputData, project,token);
      
      // Close the modal
      handleClose();

      setClick(true);

      // Trigger a re-fetch of the data if setTrigger is provided
      if (setTrigger) {
        setTrigger((prev) => !prev);
      }

  };

  return (
    show && (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <img src={img} alt="" className="header-img" />
            <h2 style={{}}>Upload from {text}</h2>
          </div>
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
          <label htmlFor="project-name">Name</label>
          <input
            type="text"
            id="project-name"
            name="name"
            onChange={handleChange}
          />
          <label htmlFor="project-link">Link</label>
          <input
            type="text"
            id="project-link"
            name="link"
            onChange={handleChange}
          />
          <div className="modal-actions">
            <button style={{width:"130px",background:'none',color:'green',border:0}}
            onClick={() => {setClick(true),handleClose()}}
            >
              view
            </button>
            <button
              className="create-button"
              style={{ width: "130px", backgroundColor: "black" }}
              onClick={handleUploadClick}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default React.memo(UploadModal);
