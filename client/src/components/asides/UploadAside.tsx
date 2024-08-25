import React from "react";
import logo from "../../assets/images/QuesLogo 2.png";
import { IoAddOutline } from "react-icons/io5";
import { RxPencil1 } from "react-icons/rx";
import { TbBoxMultiple } from "react-icons/tb";
import { FaRegGem } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import userImg from "../../assets/images/Rectangle 89.png";
type PropsType = {
  tab:string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  menuRef:React.RefObject<HTMLElement>
}
const UploadAside = ({tab,setTab,menuRef}:PropsType) => {
 
  return (
    <aside className="upload-left" ref={menuRef}>
      <header>
        <img src={logo} alt="logo" />
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
        <div className="bottom-user">
          <div className="image">
            <img src={userImg} alt="userProfile" />
          </div>
          <div className="details">
            <h5>Username</h5>
            <p>username@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default React.memo(UploadAside);
