import { useState } from "react";
import { Link } from "react-router-dom";
import fullLogo from "../assets/full_logo.svg";
import DevDarkModeButton from "./DevDarkModeButton";
import UserSignInModal from "./UserSignInModal";

function NavBar() {
  const [navModelOpen, setNavModelOpen] = useState<boolean>(false);

  return (
    <>
      <div className="top-0 sticky w-full bg-background flex-none z-10 text-text">
        <div className="max-w-4xl relative flex items-center mx-auto">
          <div className="lg:px-8 lg:mx-0 mx-4 flex w-full py-1">
            <div className="text-3xl flex justify-center items-center space-x-4">
              <img src={fullLogo} alt="Zest" className="max-h-[48px]" />
              <h1 className="font-logo text-4xl">Zest</h1>
            </div>
            {/* Navigation for Large Screens*/}
            <div className="ml-auto lg:flex justify-between space-x-8 hidden items-center">
              <Link
                className="hover:bg-secondary rounded p-4 active:bg-accent"
                to={"/"}
              >
                <p>Home</p>
              </Link>
              <Link
                className="hover:bg-secondary rounded p-4 active:bg-accent"
                to={"/about"}
              >
                <p>About</p>
              </Link>
              <Link
                className="hover:bg-secondary rounded p-4 active:bg-accent"
                to={"/post"}
              >
                <p>Post</p>
              </Link>

              <DevDarkModeButton />
              <UserSignInModal />
            </div>
            <div className="ml-auto lg:hidden flex justify-between space-x-8 items-center">
              <button
                onClick={() => {
                  setNavModelOpen((prev) => !prev);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Modal For Moble*/}
      {navModelOpen && (
        <>
          <div className="absolute w-full h-full backdrop-blur-sm top-0 z-10"></div>
          <div className="bg-primary h-2/3 absolute w-2/3 right-2 top-2 z-20 items-start rounded-md">
            <div className="w-full">
              <button
                className="ml-auto pr-2 pt-2 items-start flex"
                onClick={() => {
                  setNavModelOpen((prev) => !prev);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center text-background space-y-3 mt-10">
              <Link
                to={"/"}
                onClick={() => {
                  setNavModelOpen((prev) => !prev);
                }}
              >
                <p>Home</p>
              </Link>
              <Link
                to={"/about"}
                onClick={() => {
                  setNavModelOpen((prev) => !prev);
                }}
              >
                <p>About</p>
              </Link>
              <Link
                to={"/post"}
                onClick={() => {
                  setNavModelOpen((prev) => !prev);
                }}
              >
                <p>Post</p>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NavBar;
