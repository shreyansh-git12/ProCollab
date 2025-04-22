import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="absolute inset-0 bg-background bg-opacity-10 flex justify-center items-center z-10">
      <div className="w-60 h-60">
        <DotLottieReact
          src="https://lottie.host/3b3a1030-152d-424a-9745-17502386647c/XKjuft1lOg.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default Loading;
