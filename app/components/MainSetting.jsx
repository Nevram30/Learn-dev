"use client";
import { BsThreeDotsVertical } from "react-icons/bs";

const MainSettings = () => {
  return (
    <div className="dropdown dropdown-end font-[Poppins] py-2">
      <label tabIndex={0}>
        <div className="profile">
          <div className="avatar">
            <div className="cursor-pointer">
              <BsThreeDotsVertical className="three w-7 h-7" />
            </div>
          </div>
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Save videos</a>
        </li>
        <li>
          <a>Libraries</a>
        </li>
        <li>
          <a>Favorites</a>
        </li>
      </ul>
    </div>
  );
};

export default MainSettings;
