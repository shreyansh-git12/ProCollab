import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";
import { FaPaperclip } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user.context"; // make sure the path is correct

const GetStartedPanelStyled = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleGetStarted = () => {
    if (user) {
      navigate("/project-dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="dotted-bg-home">
      <div
        className="w-full px-6 md:px-10 py-12 text-white max-w-5xl mx-auto md:max-w-4xl "
        id="getting-started"
      >
        <h2 className="text-2xl font-bold text-black mb-8 text-left dark:text-white">
          Let’s Get Started
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-start justify-between bg-background ">
          {/* Left Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-between rounded-lg p-4">
            <div className="flex flex-col items-center gap-4">
              <DotLottieReact
                src="https://lottie.host/5cd92228-fb09-458f-872e-892fc31864dc/hXVetfjwRd.lottie"
                autoplay
                className="dark:hidden h-100 w-150"
              />
              <DotLottieReact
                src="https://lottie.host/7438926e-9365-4d08-9f6f-e3cae6f5ac99/1fotyA8yy4.lottie"
                autoplay
                className="hidden dark:block h-100 w-150"
              />
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                className="text-black w-fit dark:text-white"
                onClick={handleGetStarted}
              >
                <FaPaperclip className="mr-2" />
                <span className="text-xs md:text-sm">Get started for free</span>
              </Button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            Start your journey by creating a project. Whether you're
            brainstorming with a team or building solo, ProCollab gives you the
            space and AI tools to bring your ideas to life — faster, smarter,
            and together. From assigning tasks and tracking progress to
            AI-generated suggestions and real-time collaboration — everything is
            designed to keep your team in sync. With intuitive design and
            powerful features, you can effortlessly manage deadlines, enhance
            productivity, and scale ideas efficiently. Whether you're building
            an MVP or scaling a full-fledged product, ProCollab keeps every
            contributor aligned and focused on impact.
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedPanelStyled;
