import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
    console.log("this is the user :" + currentUser);
  return (
    <header className="bg-gray-300 flex justify-between items-center max-w-6xl mx-auto p-4">
      <Link to="/">
        <h1>Auth App</h1>
      </Link>
      <nav>
        <ul className="flex gap-3">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
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
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
}
