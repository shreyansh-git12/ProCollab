import React from "react";

const steps = [
  {
    title: "1. Sign Up or Log In",
    description:
      "Create your free ProCollab account or log in to start collaborating instantly.",
  },
  {
    title: "2. Create or Join a Project",
    description:
      "Start your own project or join an existing one that matches your skills and interests.",
  },
  {
    title: "3. Collaborate with AI Assistance",
    description:
      "Use built-in AI tools to brainstorm ideas, assign tasks, and streamline your workflow.",
  },
  {
    title: "4. Track Progress & Deliver",
    description:
      "Communicate in real-time, track project status, and get things done — together.",
  },
];

const IntroAndSteps = () => {
  return (
    <section className="dotted-bg-home">
      <div className="px-8 sm:px-8 md:px-16 py-16 max-w-4xl mx-auto  dark:text-white bg-white dark:bg-background text-foreground">
        <h1 className="text-2xl md:text-2xl font-bold mb-6">
          Introducing ProCollab: Your All-in-One AI-Powered Project
          Collaboration Hub
        </h1>

        <p className="text-base leading-relaxed mb-6 text-gray-800 dark:text-gray-300">
          ProCollab is a platform designed to connect developers, designers,
          writers, and innovators on one seamless interface. Whether you're
          working on a side hustle, research project, or startup idea — our
          AI-assisted workspace helps bring your project to life faster and
          smarter.
        </p>

        <p className="text-base leading-relaxed mb-12 text-gray-800 dark:text-gray-300">
          Use AI to assign tasks, get suggestions, track progress, and
          collaborate without the chaos. From idea to execution, ProCollab gives
          you the edge to ship faster — together.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
          How to Use ProCollab
        </h2>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index}>
              <p className="text-lg font-semibold mb-1 text-black dark:text-white">
                {step.title}
              </p>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroAndSteps;
