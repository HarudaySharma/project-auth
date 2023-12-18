import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  siginInStart,
  signInSuccess,
  siginInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";


function Signin() {
  const [formData, setFormData] = useState({});
  const [signedIn, setSignedIn] = useState(null);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(siginInStart());
      const res = await fetch("/backend/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch( siginInFailure());
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
    <main className="max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="p-4 bg-slate-300 rounded-2xl"
          required
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          id="pass"
          placeholder="password"
          className="p-4 bg-slate-300 rounded-2xl"
          required
          onChange={handleInputChange}
        />
        <input
          type="submit"
          value={loading ? "Loading..." : "Sign in"}
          disabled={loading}
          className=" py-3 rounded-md text-white  uppercase bg-slate-700 hover:bg-slate-500 hover:cursor-pointer disabled:bg-slate-400"
        />
        <OAuth />
      </form>
      <div className="flex gap-2">
        <p>Dont have an account? </p>
        <Link to="/sign_up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      {signedIn && <p className="mt-5 text-green-500">logged in successfully!</p>}
      {signedIn === false && <p className="mt-5 text-red-500">User not Found!</p>}
    </main>
  );
}

export default Signin;
