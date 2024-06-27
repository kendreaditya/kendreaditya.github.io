'use client';

import { projects, Project } from "@/public/resume";
import { useState, useEffect } from "react";
import { GalleryVerticalEnd, ArrowUpRight } from "lucide-react"
import { ReactNode, ElementType } from "react";

const ProjectNode = ({
  project,
  Graphic,
}: {
  project: Project;
  Graphic: ElementType;
}) => (
  <div className="flex items-center space-x-4">
    <div className="flex-none rounded-xl w-16 h-16 shadow-[0_4px_4px_rgba(0,0,0,0.25),inset_0_3px_0_-1.5px_rgba(60,59,62,0.75)] bg-gradient-to-b from-[#242427] to-[#19191C] overflow-hidden">
      <Graphic />
    </div>
    <div>
      <h3 className="text-sm">
        {project.title}{" "}
        <a href={project.link}>
          {" "}
          <ArrowUpRight className="inline w-5 h-5 hover:scale-110" />
        </a>
      </h3>
      <p className=" text-xs text-[#a1a1a1]">{project.description[0]}</p>
    </div>
  </div>
);

const Search= (project: Project) => {
  return (
    <div className="py-2 pl-2 my-2.5 w-20">
      <div className="flex flex-row rounded-full border border-neutral-100 p-0.5 items-center space-x-2 bg-black">
        <div className="flex w-full bg-[#2e2e2e] h-5 rounded-full justify-start items-center">
          <div className="pl-2 text-xs text-white/75 animate-pulse">
            search
          </div>
        </div>
      </div>
    </div>
  );
};

const HeartSound = () => {
  return (
    <div className="w-auto h-auto my-3">
      <svg
        className="w-16 p-2"
        id="wave"
        viewBox="0 0 200 82"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 47.1418H31.4214C34.2477 32.7585 40.399 12.622 42.394 47.1418C44.8878 90.2915 49.3766 91.609 51.3716 47.1418C53.3666 2.67456 59.3516 -26.9704 60.8479 47.1418C62.0449 106.432 66.6667 71.8459 68.8279 47.1418C70.4904 32.5389 74.6135 12.0949 77.8055 47.1418C80.9975 82.1886 85.453 61.7446 87.2818 47.1418C88.2793 40.554 91.8703 31.3312 98.2544 47.1418C106.234 66.9051 108.229 46.4831 109.726 46.4831C111.222 46.4831 125.187 46.4831 127.182 46.4831C129.177 46.4831 133.666 30.6725 134.663 46.4831C135.661 62.2936 140.648 87.9859 142.643 46.4831C144.239 13.2808 149.958 32.6488 152.618 46.4831C154.281 52.3022 158.504 60.4491 162.095 46.4831C166.584 29.0255 168.08 47.1418 171.571 47.1418C174.364 47.1418 180.05 47.1418 200 47.1418"
          stroke="white"
          strokeWidth="6"
        />
      </svg>
  </div>
  );
};

export default function Projects() {
    return (
      <>
        <h2 className="items-center justify-center w-full m-3 mt-12 text-base font-semibold text-left text-white">
          <GalleryVerticalEnd className="inline w-5 mr-2" />
          Projects 
        </h2>

        <div className="grid grid-flow-row grid-cols-2 gap-3">
          <ProjectNode project={projects[0]} Graphic={Search}/>
          <ProjectNode project={projects[1]} Graphic={HeartSound}/>
        </div>
      </>
    );
};