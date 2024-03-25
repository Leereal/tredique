"use client";
import { Logo } from "@/components/Logo";
import { useEffect, useState } from "react";
import { navLinks } from "@/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaAngleRight } from "react-icons/fa6";

export default () => {
  const [state, setState] = useState(false);

  // useEffect(() => {
  //   document.onclick = (e) => {
  //     const target = e.target;
  //     if (!target.closest(".menu-btn")) setState(false);
  //   };
  // }, []);

  return (
    <nav
      className={`pb-5 md:text-sm ${
        state
          ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
          : ""
      }`}
    >
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8 bg-white rounded-br-2xl rounded-bl-2xl">
        <div className="flex items-center justify-between py-5 md:block">
          <Logo />
          <div className="md:hidden">
            <Button
              className="menu-btn text-white hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
        <div
          className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
            state ? "block" : "hidden"
          } `}
        >
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navLinks.map((item, idx) => {
              return (
                <li key={idx} className="text-gray-700 hover:text-gray-900">
                  <a href={item.route} className="block">
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            <SignedIn>
              <Button asChild className="rounded-full" size="lg">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-up"
                className="block text-gray-700 hover:text-gray-900"
              >
                Sign Up
              </Link>
              <Link
                href="/sign-in"
                className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-purple-gradient hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
              >
                Sign in
                <FaAngleRight />
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};
