import React from "react";
import logo from "../assets/logo.png";
import logo1 from "../assets/logo-black (2).png";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaBars } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import { useUser } from "../context/user.context";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const scrollToSection = () => {
    setTimeout(() => {
      const section = document.getElementById("getting-started");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav className="w-full px-12 py-1 flex items-center justify-between">
      <img
        src={logo}
        alt="Logo"
        className="h-20 w-auto mt-3 hidden dark:block"
      />
      <img src={logo1} alt="Logo" className="h-20 w-auto dark:hidden mt-3" />

      <div className="flex items-center gap-6 text-sm">
        <div className="hidden md:flex gap-6">
          <div className="flex gap-3">
            <Button
              variant="link"
              className="text-md"
              onClick={scrollToSection}
            >
              Get Started
            </Button>
            <Button variant="link" className="text-md">
              About US
            </Button>
          </div>

          {!user ? (
            <>
              <Button
                variant="outline"
                className="dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
              <Button
                className="dark:bg-cyan-300 dark:text-black dark:hover:bg-cyan-300"
                onClick={() => navigate("/register")}
              >
                Sign up
              </Button>
            </>
          ) : (
            <LogoutButton />
          )}
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FaBars className="darktext-white h-6 w-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={scrollToSection}>
                Get Started
              </DropdownMenuItem>
              <DropdownMenuItem>About Us</DropdownMenuItem>

              {!user ? (
                <>
                  <DropdownMenuItem onClick={() => navigate("/login")}>
                    Log in
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/register")}>
                    Sign up
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <LogoutButton />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
