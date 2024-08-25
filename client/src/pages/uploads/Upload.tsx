import { useEffect, useRef, useState } from "react";
import UploadAside from "../../components/asides/UploadAside";
import { MdLogout } from "react-icons/md";
import { PiBell } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import rss from "../../assets/images/image 1 (1).png";
import yt from "../../assets/images/image 2 (1).png";
import upld from "../../assets/images/image 3.png";
import upld1 from "../../assets/images/ic_round-upload (1).png";
import AddPodcast from "../../components/podcasts/AddPodcast";
import Table from "../../components/podcasts/Table";
import ModalHoc, { HocPropsType } from "../../components/hoc/ModalHoc";
import UploadModal from "../../components/modals/uploadModal";
import { BiMenu } from "react-icons/bi";
import { handleUpload } from "../../utils/actions";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

type Episodes = {
  episodes?:{
    _id:string;
    name:string,
    transcript:string;
    updatedAt:Date;
  }[]
}

const Upload = ({ show, setShow, handleClose,triggerFetch, setTriggerFetch }: HocPropsType) => {
  const {project} = useParams();
  
  const {datas,loading,error} = useFetch<Episodes>(`/episode/${project}`,triggerFetch);
  
  const [tab, setTab] = useState<string>("add");
  const [text, setText] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const menuRef = useRef<HTMLElement>(null);
  const[click,setClick] = useState<boolean>(false);
 const navigate = useNavigate();
  const toggleMenu = () => {
    let menuElement = menuRef.current;
    if(menuElement){

      if (menuElement.style.display === '') {
        menuElement.style.display = 'none';
      }
      const isNotVisible = menuElement.style.display === 'none';
      menuElement.style.display = isNotVisible ? 'inline' : 'none';
      menuElement.style.position = isNotVisible ? 'absolute':''
      menuElement.style.width = isNotVisible ? '300px' : '';
      menuElement.style.height = isNotVisible ? '100%' : ''
      menuElement.style.zIndex = isNotVisible ? '1100' : '' 
      menuElement.style.boxShadow = isNotVisible ? '0 4px 6px rgba(0, 0, 0, 0.1);' : ''
    }
  }

  const resetMenuStyles = () => {
    let menuElement = menuRef.current;
    if (menuElement) {
      menuElement.style.display = '';
      menuElement.style.position = '';
      menuElement.style.width = '';
      menuElement.style.height = '';
      menuElement.style.zIndex = '';
      menuElement.style.boxShadow = '';
    }
  };

  useEffect(() => {
    // Add event listener to reset styles on window resize
    window.addEventListener('resize', resetMenuStyles);

    // Cleanup event listener on component unmount
    return () => {
      setClick(false);
      window.removeEventListener('resize', resetMenuStyles);
    };
  }, []);

  return (
    <section className="upload-container">
      <UploadAside tab={tab} setTab={setTab} menuRef={menuRef}/>
      <div className="upload-content1-right">
        <header className="right-header">
          <p style={{ cursor: "pointer" }}>
            {<GoHome size={20} />} <span onClick={()=>navigate('/home')}>Home /</span> <span onClick={()=>navigate('/projects')}>{project} / </span>
            <span style={{ color: "#7E22CE" }}>
              {tab === "add"
                ? "Add your Podcast"
                : tab === "create"
                ? "Create"
                : tab === "widget"
                ? "Widget"
                : "Upgrade"}
            </span>
          </p>
          <div className="settings">
            <span className="responsive-nav" onClick={toggleMenu}>
              <BiMenu style={{width:'1.75rem',height:'1.75rem',cursor:'pointer'}}/>
            </span>
            <div className="bell">{<PiBell size={25} />}</div>
            <div className="logout">{<MdLogout color="red" size={25} />}</div>
          </div>
        </header>
        {tab === "add" && (
          <>
            <h1 className="podcast-header">Add Podcast</h1>
            <section className="podcasts" style={{ cursor: "pointer" }}>
              <div
                className="podcasts-content"
                onClick={() => {
                  setShow(true);
                  setText("RSS");
                  setImg(rss);
                  setClick(true);
                }}
              >
                <div className="podcasts-text">
                  <h2>RSS Feed</h2>
                  <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
                </div>
                <div className="podcasts-image">
                  <img src={rss} alt="" />
                </div>
              </div>
              <div
                className="podcasts-content"
                onClick={() => {
                  setShow(true);
                  setText("Youtube");
                  setImg(yt);
                  setClick(true);
                }}
              >
                <div className="podcasts-text">
                  <h2>Youtube</h2>
                  <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
                </div>
                <div className="podcasts-image">
                  <img src={yt} alt="" />
                </div>
              </div>
              <div
                className="podcasts-content"
                onClick={() => {
                  setShow(true);
                  setText("File");
                  setImg(upld1);
                  setClick(true);
                }}
              >
                <div className="podcasts-text">
                  <h2>Upload Files</h2>
                  <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
                </div>
                <div className="podcasts-imagespcl">
                  <img
                    src={upld1}
                    alt=""
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
              </div>
            </section>

            { click ? <Table datas={datas[0]?.episodes}/> : <AddPodcast /> }
            
          </>
        )}
      </div>
      <UploadModal
        show={show}
        handleClose={handleClose}
        handleUpload={handleUpload}
        text={text}
        img={img}
        project={project}
        setTrigger={setTriggerFetch}
      />
    </section>
  );
};

export default ModalHoc(Upload);
