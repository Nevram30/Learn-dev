"use client";
import Image from "next/image";

const ProfileProps = () => {
  return (
    <div className="dropdown dropdown-end font-[Poppins]">
      <label tabIndex={0}>
        <div className="profile">
          <div className="avatar">
            <div className="w-[50px] border rounded-full cursor-pointer">
              <Image src="/avatar.jpg" width={400} height={400} />
            </div>
          </div>
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Edit profile</a>
        </li>
        <li>
          <a>Log out</a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileProps;
