import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/backend/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      console.log(data.success);
      if (!data.success) {
        setError(1);
        return;
      }
        setError(2);
        setTimeout(navigate('/'), 1000);

    } catch (err) {
      setError(true);
      setLoading(false);
      console.log(err);
    }
    
  };
  // console.log(formData);

  return (
    <main className="max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Sign in
      </h1>
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
      </form>
      <div className="flex gap-2">
        <p>Dont have an account? </p>
        <Link to="/sign_up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="mt-5 text-red-500">{error === 1 ? "User not found!" : error === 2 && "logged in successfully!"}</p>
    </main>
  );
}

export default Signin;
