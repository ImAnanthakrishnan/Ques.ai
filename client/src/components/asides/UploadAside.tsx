import React from "react";
import logo from "../../assets/images/QuesLogo 2.png";
import { IoAddOutline } from "react-icons/io5";
import { RxPencil1 } from "react-icons/rx";
import { TbBoxMultiple } from "react-icons/tb";
import { FaRegGem } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import userImg from "../../assets/images/Rectangle 89.png";
import { useAppSelector } from "../../app/hooks";
import { IoMdClose } from "react-icons/io";
type PropsType = {
  tab:string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  menuRef:React.RefObject<HTMLElement>
  setProfile:React.Dispatch<React.SetStateAction<boolean>>;
  resetMenu:()=>void
}
const UploadAside = ({tab,setTab,menuRef,setProfile,resetMenu}:PropsType) => {

  const {currentUser} = useAppSelector(data => data.user);
 
  return (
    <aside className="upload-left" ref={menuRef} >
      <header style={{display:'flex',justifyContent:'space-between'}}>
        <img src={logo} alt="logo" />
        <span onClick={resetMenu} className="responsive-close"><IoMdClose size={20} color="red" /></span>
      </header>

      <nav className="aside-nav">
        <ul>
          <li
            className={`${tab === "add" && "violet"}`}
            onClick={() => setTab("add")}
          >
            {<IoAddOutline style={{ marginRight: "5px" }} />} Add your
            Podcast(s)
          </li>
          <li
            className={`${tab === "create" && "violet"}`}
            onClick={() => setTab("create")}
          >
            {<RxPencil1 style={{ marginRight: "5px" }} />} Create & Repurpose
          </li>
          <li
            className={`${tab === "widget" && "violet"}`}
            onClick={() => setTab("widget")}
          >
            {<TbBoxMultiple style={{ marginRight: "5px" }} />} Podcast Widget
          </li>
          <li
            className={`${tab === "upgrade" && "violet"}`}
            onClick={() => setTab("upgrade")}
          >
            {<FaRegGem style={{ marginRight: "5px" }} />} Upgrade
          </li>
        </ul>
      </nav>
      <hr />

      <div className="upload-middle">
        <p>
          {
            <IoSettingsOutline
              size={20}
              style={{ marginRight: "5px", paddingTop: "5px" }}
            />
          }{" "}
          Help
        </p>
      </div>
      <div className="upload-bottom">
        <hr />
        <div className="bottom-user" onClick={() => setProfile(true)}>
          <div className="image">
            <img src={userImg} alt="userProfile" />
          </div>
          <div className="details">
            <h5>{currentUser ? currentUser.name :'Username'}</h5>
            <p>{currentUser ? currentUser.email : 'username@gmail.com'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default React.memo(UploadAside);
