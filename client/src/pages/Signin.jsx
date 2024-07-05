import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  siginInStart,
  signInSuccess,
  siginInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { InputBox, Button, OAuth } from "../components";

const API_URL = import.meta.env.VITE_API_URL;


function Signin() {
  const [formData, setFormData] = useState({});
  const [signedIn, setSignedIn] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [type, setType] = useState("password");
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = useCallback((e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  },[formData]);

  const handleToggle = (e) => {
    e.stopPropagation();
    type === "password" ? setType("text") : setType("password");
    setShowPass((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(siginInStart());
      const res = await fetch(`${API_URL}/backend/auth/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(siginInFailure());
        setSignedIn(false);
        return;
      }
      dispatch(signInSuccess(data));
      setSignedIn(true);
      //setError(2);
      setTimeout(navigate("/"), 3000);

    } catch (err) {
      dispatch(siginInFailure(err));
      setSignedIn(false);
      console.log(err);
    }
  };
  // console.log(formData);

  return (
    <main className="shadow-2xl bg-box-color border-black p-8 my-32 mx-auto border-2 max-w-xl font-mono ">


      <h1 className="text-3xl text-center font-semibold my-7 uppercase tracking-wider">Sign in</h1>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">

        <InputBox labelText="e-mail" type="email" name="email" id="email" required={true} handleInputChange={handleInputChange} />
        <InputBox labelText="password" type={type} name="password" id="pass" required={true} handleInputChange={handleInputChange} className={`relative`}>
        <span
            className=" w-fit relative  left-full bottom-11 -mx-10 hover:cursor-pointer "
            onClick={handleToggle}
          >
            {showPass ? <IoIosEye size={25} /> : <IoIosEyeOff size={25} />}
          </span>
        </InputBox>

        <Button formBtn={true} type="submit" value={loading ? "Loading..." : "Sign in"} disabled={loading}
          className={`mt-5 mb-3 p-4 bg-surround outline outline-2 uppercase tracking-widest hover:bg-surround-hover  hover:relative hover:left-4 hover:shadow-2xl disabled:bg-slate-400  `}
        />
  
        <OAuth />


      </form>

      <section className="flex gap-2">

        <p>Dont have an account? </p>
        <Link to="/sign_up">
          <span className="text-blue-500 hover:text-red-500">Sign Up</span>
        </Link>

      </section>

      {signedIn && <p className="mt-5 text-green-500">logged in successfully!</p>}
      {signedIn === false && <p className="mt-5 text-red-500">User not Found!</p>}

    </main>
  );
}

export default Signin;
