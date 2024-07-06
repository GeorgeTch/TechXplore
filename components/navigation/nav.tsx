"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import UserBtn from "./user-button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import logo from "@/public/Invest X.png";
import Image from "next/image";

export default function Nav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authCookie = Cookies.get("auth"); // Get the cookie using js-cookie
    if (authCookie) {
      try {
        const authData = JSON.parse(authCookie);
        setIsAuthenticated(true);
        setUser(authData);
      } catch (error) {
        console.error("Error parsing auth cookie:", error);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const handleSignOut = () => {
    Cookies.remove("auth"); // Remove the cookie using js-cookie
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <header className="flex flex-col justify-center p-4 sm:px-12 rounded-b-3xl sm:rounded-b-full fixed top-0 left-0 w-full h-16 z-50 bg-secondary opacity-90">
      <nav className="justify-center items-center">
        <ul className="flex justify-between items-center gap-4 md:gap-8">
          <li className="flex-1">
            <Link
              className="px-5 py-3 font-bold cursor-pointer w-36 h-14 rounded-md hover:scale-105 transition-all duration-700 ease-in-out"
              href={"/"}
              aria-label="company logo"
            >
              <Image
                className="bg-secondary rounded-lg"
                src={logo}
                width={120}
                height={30}
                alt="company logo"
              />
            </Link>
          </li>

          {!isAuthenticated ? (
            <li className="flex items-center justify-center hover:scale-105 transition-all duration-700 ease-in-out">
              <Button asChild>
                <Link className="flex gap-2" href="/auth/login">
                  <LogIn size={14} />
                  <span>Log In</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li className="flex items-center justify-center hover:scale-110 transition-all duration-500 ease-in-out">
              <UserBtn user={user} onSignOut={handleSignOut} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
