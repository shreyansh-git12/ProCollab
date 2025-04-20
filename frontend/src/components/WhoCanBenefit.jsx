import React from "react";

const beneficiaries = [
  {
    title: "Students & College Teams",
    description:
      "Collaborate on projects with AI assistance for planning, task management, and faster execution.",
  },
  {
    title: "Freelancers",
    description:
      "Find teammates or clients, showcase your skills, and speed up delivery with built-in AI tools.",
  },
  {
    title: "Startup Founders",
    description:
      "Bring your ideas to life by connecting with devs, designers, and marketers — all in one place.",
  },
  {
    title: "Developers",
    description:
      "Work on exciting open-source or freelance projects, and let the AI assist with code and structure.",
  },
  {
    title: "Designers",
    description:
      "Find developers and collaborators while using AI to assist with layouts, UX, and visual consistency.",
  },
  {
    title: "Content Writers",
    description:
      "Collaborate on product copy, marketing content, and documentation, with AI writing support.",
  },
  {
    title: "Researchers & Analysts",
    description:
      "Use ProCollab to organize findings, co-author reports, and use AI for insights and summaries.",
  },
  {
    title: "Remote Teams",
    description:
      "Manage real-time progress with centralized chat, boards, and AI features to boost collaboration.",
  },
];

const WhoCanBenefit = () => {
  return (
    <section className="py-16 px-8 sm:px-8 md:px-10 text-black dark:text-white dotted-bg-home ">
      <div className="max-w-3xl mx-auto bg-background">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-14">
          Who Can Benefit from ProCollab? Basically, Everyone!
        </h2>
        <div className="space-y-6 text-sm md:text-base text-gray-800 dark:text-gray-300">
          {beneficiaries.map((item, index) => (
            <p key={index}>
              <span className="font-semibold text-black dark:text-white">
                {item.title}:
              </span>{" "}
              {item.description}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoCanBenefit;
