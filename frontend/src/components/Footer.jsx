import logo from "../assets/logo.png";
import logo1 from "../assets/logo-black (2).png";
import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user.context";

const Footer = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <footer className="w-full dark:text-white px-6 md:px-20 py-10">
      <div className="flex flex-col items-center md:flex-row md:justify-between md:items-start gap-8">
        <img
          src={logo}
          alt="Logo"
          className="h-15 w-auto mt-3 hidden dark:block"
        />
        <img src={logo1} alt="Logo" className="h-15 w-auto dark:hidden mt-3" />

        {/* Links */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-6 text-center md:text-left text-sm items-center md:mt-7 ">
          <a href="#" className="hover:underline">
            Editor
          </a>
          <a href="#" className="hover:underline">
            Pricing
          </a>
          <a href="#" className="hover:underline">
            API (Beta)
          </a>
          <a href="#" className="hover:underline">
            Feature Request
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3 md:mt-5">
          {!user ? (
            <>
              <Button
                variant="outline"
                className="dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black text-black"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
              <Button
                className="dark:bg-cyan-300 dark:text-black dark:hover:bg-cyan-400"
                onClick={() => navigate("/register")}
              >
                Sign up
              </Button>
            </>
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>

      {/* Copyright + reCAPTCHA Notice */}
      <div className="text-xs text-center mt-10 text-gray-500 space-y-1">
        <p>© 2025 procollab.ai. All rights reserved.</p>
        <p>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
