import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputBox, Button } from "../components";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const API_URL = import.meta.env.VITE_API_URL;


function Signup() {
  const [formData, setFormData] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [type, setType] = useState("password");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setLoading(true);
      const res = await fetch(`${API_URL}/backend/auth/sign_up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await res.json();
      setLoading(false);
      console.log(data);
      if (data.success === false) {
        setError(true);
        return;
      }
      setError(false);
      setTimeout(navigate('/sign_in'), 2000);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };
  // console.log(formData);

  return (
    <main className="bg-box-color border-black p-8 my-32 mx-auto border-2 max-w-xl font-mono ">


      <h1 className="text-3xl text-center font-semibold my-7 uppercase tracking-wider">
        Create Account
      </h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">

        <InputBox labelText="username" type="text" name="username" id="uname" required={true} handleInputChange={handleInputChange} />
        <InputBox labelText="e-mail" type="email" name="email" id="email" required={true} handleInputChange={handleInputChange} />
        <InputBox labelText="password" type={type} name="password" id="pass" required={true} handleInputChange={handleInputChange} className={`relative`}>
          <span
            className=" w-fit relative  left-full bottom-11 -mx-10 hover:cursor-pointer "
            onClick={handleToggle}
          >
            {showPass ? <IoIosEye size={25} /> : <IoIosEyeOff size={25} />}
          </span>
        </InputBox>

        <Button formBtn={true} type="submit" value={loading ? "Loading..." : "Sign up"} disabled={loading}
          className={` my-5 bg-inherit p-4 bg-surround outline outline-2 uppercase tracking-widest hover:bg-surround-hover  hover:relative hover:left-4 hover:shadow-2xl disabled:bg-slate-400`}
        />

      </form>

      <section className="flex gap-2">

        <p>Have an account? </p>
        <Link to="/sign_in">
          <span className="text-blue-500 hover:text-red-500 ">Sign in</span>
        </Link>

      </section>

      <p className="mt-5 text-red-500">

        {error
          ? "Input different Username OR Email"
          : error === false && "user created successfully!!"}

      </p>


    </main>
  );
}

export default Signup;
