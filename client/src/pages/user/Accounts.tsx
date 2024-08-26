import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import ProfilePic from "../../assets/images/Ellipse 21 (1).png";
import { useAppSelector } from "../../app/hooks";
import { handleUserUpdate } from "../../utils/actions";
const Accounts = ({
  setProfile,
}: {
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { currentUser,token } = useAppSelector((data) => data.user);
  const [name, setName] = useState<string | undefined>(currentUser?.name);
  const handleNavigation = () => {
    setProfile(false);
  };
  return (
    <section className="account-container">
      <header className="account-header">
        <div onClick={handleNavigation}>
          <FaArrowLeftLong size={30} /> <h2>Account Settings</h2>
        </div>
      </header>
      <section className="account-content">
        <div className="content-inner">
          <img src={ProfilePic} alt="Profile pic" />
          <div className="content-input">
            <label htmlFor="name">User Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="content-input">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              defaultValue={currentUser?.email}
              disabled
            />
          </div>
        </div>
        <button
          className="content-update-btn"
          onClick={() =>{
            handleUserUpdate(
              name ? name : currentUser?.name,
              currentUser?.email,
              currentUser,
              token
            );
          }
          }
        >
          Update
        </button>
        <div className="content-inner-sub">
          <h2>Subscription</h2>
          <div className="styled-div">
            <div className="text-container">
              Oops! You don't have any active plans.{" "}
              <strong>Upgrade now!</strong>
            </div>
            <button>Upgrade</button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Accounts;
