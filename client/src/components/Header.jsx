import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="border-2 border-black font-mono shadow-lg hover:shadow-2x flex flex-wrap justify-between items-center max-w-screen-2xl mx-auto p-4 md:pointer-events-auto ">
      <Link to="/">
        <h1 className="border-stone-500 text-xl tracking-wide hover:font-extrabold hover:border-b-4 hover:border-l-4 hover:px-2 hover:border-e-2 hover:border-s-2   hover:  hover:decoration-from-font hover:tracking-widest ">Auth App</h1>
      </Link>
      <nav>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="tracking-wide hover:font-bold hover:underline hover:decoration-from-font hover:tracking-widest">Home</li>
          </Link>
          <Link to="/about">
            <li className="hover:font-bold hover:underline hover:decoration-from-font hover:tracking-widest">About</li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <li>
                <img
                  src={currentUser.pfp}
                  alt="profile"
                  className="w-7 h-7 rounded-full object-cover"
                />
              </li>
            </Link>
          ) : (
            <Link to="/sign_in">
              <li className="hover:font-bold hover:underline hover:decoration-from-font hover:tracking-widest">SignIn</li>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
}
