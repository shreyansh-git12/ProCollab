import React, { useContext } from "react";
import { UserContext } from "../context/user.context.jsx";

import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/Herosection.jsx";
import Footer from "../components/Footer.jsx";
import FAQ from "../components/FAQ.jsx";
import WhoCanBenefit from "../components/WhoCanBenefit.jsx";
import IntroAndSteps from "../components/ui/IntroAndSteps.jsx";
import GetStartedPanel from "../components/GetStartedPanel.jsx";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <IntroAndSteps />
      <GetStartedPanel />
      <WhoCanBenefit />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
