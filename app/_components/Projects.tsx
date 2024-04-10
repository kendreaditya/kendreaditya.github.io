'use client';

import { projects, Project } from "@/public/resume";
import { useState, useEffect } from "react";

const projectNode = (project: Project) => (
    <div>
      <h3 className="mb-2 text-xl font-bold dark:text-white">
        {project.title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        {project.description}
      </p>
    </div>
);

const useTypewriter = (text: string, delay: number = 75) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    const typewriter = () => {
      if (currentIndex < text.length-1) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        currentIndex++;
        timeout = setTimeout(typewriter, delay);
      } else {
        setIsTyping(false);
      }
    };

    typewriter();

    return () => clearTimeout(timeout);
  }, [text, delay]);

useEffect(() => {
  if (!isTyping) {
    const pause = new Promise((resolve) => setTimeout(resolve, 2000)); // Pause for 2 seconds

    pause.then(() => {
      setDisplayText("");
      setIsTyping(true); // Restart the animation after the pause

          let timeout: ReturnType<typeof setTimeout>;
          let currentIndex = -1;

          const typewriter = () => {
            if (currentIndex < text.length-1) {
              setDisplayText((prevText) => prevText + text[currentIndex]);
              currentIndex++;
              timeout = setTimeout(typewriter, delay);
            } else {
              setIsTyping(false);
            }
          };

          typewriter();

          return () => clearTimeout(timeout);
      
    });

  }
}, [isTyping, text, delay]);

  return displayText;
};


const SearchCard = (project: Project) => {
  const description = useTypewriter("ask me anything...", 100);


  return (
    <a href={project.links[0].url}>
      <div className="h-full hover:scale-105 row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-white/10 border border-transparent justify-between flex flex-col space-y-4 [&>p:text-lg] md:col-span-1">
        <div className="flex flex-1 w-full h-full min-h-[6rem] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex-col space-y-2 justify-center p-2">
          <div className="flex flex-row rounded-full border border-neutral-100 p-2 items-center space-x-2 bg-black">
            <div className="flex w-full bg-[#2e2e2e] h-5 rounded-full justify-start items-center">
              <div className="text-xs text-white/75 pl-2">
                {description}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-sans font-bold">{project.title}</div>
          <div className="font-sans font-normal opacity-50 text-xs">
            <span className="text-sm">{project.description}</span>
          </div>
        </div>
      </div>
    </a>
  );
};



const MusicCard = (project: Project) => {
  return (
    <a href={project.links[0].url}>
      <div className="h-full hover:scale-105 row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-white/10 border border-transparent justify-between flex flex-col space-y-4 [&>p:text-lg] md:col-span-1">
        <div className="flex flex-1 w-full h-full min-h-[6rem] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex-col space-y-2 justify-center p-2">
          {/* <div className="grid grid-cols-3 rounded-full border border-neutral-100 p-2 m-1 bg-black"> */}
          <div className="flex rounded-full border border-neutral-100 p-2 m-1 bg-black">
            <svg
            className="my-auto flex-1"
              data-testid="geist-icon"
              height="24"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.08144 8.21092C3.92706 8.11268 3.92706 7.88733 4.08144 7.78909L14.3658 1.24451C14.5322 1.1386 14.75 1.25815 14.75 1.45542L14.75 14.5446C14.75 14.7419 14.5322 14.8614 14.3658 14.7555L4.08144 8.21092ZM0.75 2V1.25H2.25V2V14V14.75H0.75V14V2Z"
                fill="currentColor"
              ></path>
            </svg>
            <div className="bg-white w-14 h-14 rounded-full m-auto animate-pulse flex-none">
              <svg
                className="mx-auto my-2.5"
                height={36}
                data-testid="geist-icon"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.5 2.5V1.75H4V2.5V13.5V14.25H5.5V13.5V2.5ZM12 2.5V1.75H10.5V2.5V13.5V14.25H12V13.5V2.5Z"
                  fill="back"
                ></path>
              </svg>
            </div>
            <svg
              className="my-auto flex-1"
              data-testid="geist-icon"
              height="24"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.6686 8.21092C11.8229 8.11268 11.8229 7.88733 11.6686 7.78909L1.38422 1.24451C1.21779 1.1386 1 1.25815 1 1.45542V14.5446C1 14.7419 1.21779 14.8614 1.38422 14.7555L11.6686 8.21092ZM15 2V1.25H13.5V2V14V14.75H15V14V2Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-sans font-bold">{project.title}</div>
          <div className="font-sans font-normal opacity-50 text-xs">
            <span className="text-sm">{project.description}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

const HeartSoundCard = (project: Project) => {
  return (
    <a href={project.links[0].url}>
      <div className="h-full hover:scale-105 row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-white/10 border border-transparent justify-between flex flex-col space-y-4 [&>p:text-lg] md:col-span-1">
        <div className="flex flex-1 w-full h-full min-h-[6rem] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex-col space-y-2 justify-center p-3">
          <svg
            id="wave"
            viewBox="0 0 200 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 47.1418H31.4214C34.2477 32.7585 40.399 12.622 42.394 47.1418C44.8878 90.2915 49.3766 91.609 51.3716 47.1418C53.3666 2.67456 59.3516 -26.9704 60.8479 47.1418C62.0449 106.432 66.6667 71.8459 68.8279 47.1418C70.4904 32.5389 74.6135 12.0949 77.8055 47.1418C80.9975 82.1886 85.453 61.7446 87.2818 47.1418C88.2793 40.554 91.8703 31.3312 98.2544 47.1418C106.234 66.9051 108.229 46.4831 109.726 46.4831C111.222 46.4831 125.187 46.4831 127.182 46.4831C129.177 46.4831 133.666 30.6725 134.663 46.4831C135.661 62.2936 140.648 87.9859 142.643 46.4831C144.239 13.2808 149.958 32.6488 152.618 46.4831C154.281 52.3022 158.504 60.4491 162.095 46.4831C166.584 29.0255 168.08 47.1418 171.571 47.1418C174.364 47.1418 180.05 47.1418 200 47.1418"
              stroke="white"
              strokeWidth="3"
            />
          </svg>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-sans font-bold">{project.title}</div>
          <div className="font-sans font-normal opacity-50 text-xs">
            <span className="text-sm">{project.description}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default function Projects() {
    return (
      <>
        <h2 className="text-3xl font-semibold text-gray-600 mt-12 text-left w-full m-3">
          projects that im proud of
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-200 w-full mx-auto md:auto-rows-[20rem]">
          {SearchCard(projects[0])}
          {MusicCard(projects[1])}
          {HeartSoundCard(projects[2])}
        </div>
      </>
    );
};