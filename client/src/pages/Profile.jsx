import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

function Profile() {
  const [showPass, setShowPass] = useState(false);
  const [type, setType] = useState("password");
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);
  const dispatch  = useDispatch();

  const handleToggle = (e) => {
    e.stopPropagation();
    type === "password" ? setType("text") : setType("password");
    setShowPass((prev) => !prev);
  };

  const handleUpdate = (e) => {};
  return (
    <main className="mt-10 py-8 border-2 max-w-lg flex flex-col mx-auto place-items-center">
      <img src={currentUser.pfp} alt="user image" className="w-44 h-44 rounded-full"/>
      <fieldset className="my-3 flex flex-col w-2/3 ">
        <label
          htmlFor="uname"
          className="px-2 uppercase text-sm tracking-wider"
        >
          username
        </label>
        <input
          type="text"
          value={currentUser.username}
          id="uname"
          className="p-4 min-w-md h-auto bg-slate-300 rounded-2xl hover:bg-slate-200 hover:cursor-pointer "
        />
      </fieldset>
      <fieldset className="my-3 flex flex-col w-2/3 ">
        <label
          htmlFor="email"
          className="px-2 uppercase text-sm tracking-wider"
        >
          email
        </label>
        <input
          type="email"
          value={currentUser.email}
          id="email"
          className="p-4 min-w-md h-auto bg-slate-300 rounded-2xl hover:bg-slate-200 hover:cursor-pointer "
        />
      </fieldset>
      <fieldset className="my-3 flex flex-col w-2/3 ">
        <label
          htmlFor="password"
          className="px-2 uppercase text-sm tracking-wider"
        >
          password
        </label>
        <input
          type={type}
          id="password"
          className="relative p-4 min-w-md h-auto bg-slate-300 rounded-2xl hover:bg-slate-200 hover:cursor-pointer "
        />
        <span
          className="relative left-72 -top-11 w-fit  hover:cursor-pointer"
          onClick={handleToggle}
        >
          {showPass ? <IoIosEye size={25} /> : <IoIosEyeOff size={25} />}
        </span>
      </fieldset>
      <input
        type="submit"
        value="update"
        onClick={handleUpdate}
        className="p-4 w-2/3  min-w-md h-auto text-white uppercase tracking-wider bg-red-500 rounded-2xl hover:bg-red-400 hover:cursor-pointer"

      />
    </main>
  );
}

export default Profile;
