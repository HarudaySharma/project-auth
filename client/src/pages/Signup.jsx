import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <main className="max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Create Account
      </h1>
      <form action="" method="post" className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          id="uname"
          placeholder="username"
          className="p-4 bg-slate-300 rounded-2xl"
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="p-4 bg-slate-300 rounded-2xl"
          required
        />
        <input
          type="password"
          name="password"
          id="pass"
          placeholder="password"
          className="p-4 bg-slate-300 rounded-2xl"
        />
        <input
          type="submit"
          value="Submit"
          className=" py-3 rounded-md text-white  uppercase bg-slate-700 hover:bg-slate-500 hover:cursor-pointer"
        />
      </form>
      <div className="flex gap-2">
        <p>Have an account? </p>
        <Link to="/sign-in">
          <span className="text-blue-500"> Sign in</span>
        </Link>
      </div>
    </main>
  );
}

export default Signup;
