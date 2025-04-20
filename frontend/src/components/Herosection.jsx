import React from "react";

const HeroSection = () => {
  return (
    <section className="text-center py-20 px-6 md:px-20 dotted-bg-home">
      <div className="bg-background text-foreground">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Collaborate Smartly with{" "}
          <span className="dark:text-cyan-400">procollab</span>
        </h1>
        <h2 className="text-2xl md:text-xl font-semibold mb-6">
          AI-powered Project Collaboration Platform
        </h2>
        <p className="text-lg md:text-xl leading-8 max-w-3xl mx-auto">
          Empower your team with <strong>procollab</strong>, the ultimate AI
          tool designed to enhance team collaboration, streamline project
          workflows, and boost productivity. Built on top of cutting-edge AI
          models like ChatGPT and GPT-4, procollab helps you plan, communicate,
          and execute projects more efficiently than ever. Perfect for
          developers, creators, and teams who want to{" "}
          <em>build better, faster</em>.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
