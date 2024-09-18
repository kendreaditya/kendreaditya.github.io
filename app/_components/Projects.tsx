import data from "@/public/data.json";
import { GalleryVerticalEnd, ArrowUpRight } from "lucide-react";
import { ElementType } from "react";

const Readsome = () => (
  <div className="overflow-hidden h-[75px] w-[90px] pt-[2px]">
    <div className="text-[6px] text-content -ml-1">
      The Hunger Games Harry Potter and the Philosophers Stone Twilight To Kill
      a Mockingbird The Great Gatsby The Fault in Our Stars The Hobbit or There
      and Back Again The Catcher in the Rye Angels Demons Pride and Prejudice
      and Back Again The Catcher in the Rye Angels Demons Pride and Prejudice
    </div>
  </div>
);

const Search = () => (
  <div className="py-2 pl-2 my-2.5 w-20">
    <div className="flex flex-row rounded-full border border-neutral-100 p-0.5 items-center space-x-2 bg-black">
      <div className="flex w-full bg-[#2e2e2e] h-5 rounded-full justify-start items-center">
        <div className="pl-2 text-xs text-white/75 animate-pulse">search</div>
      </div>
    </div>
  </div>
);

const HeartSound = () => (
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

const graphicComponents = {
  Search,
  HeartSound,
  Readsome
};

const ProjectNode = ({ title, link, description, graphic }: { title: string, link: string, description: string[], graphic: any}) => {
  const Graphic = graphicComponents[graphic as keyof typeof graphicComponents];
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block group"
    >
      <div className="content-item">
        <div className="item-image overflow-hidden" style={{ padding: 0 }}>
          <Graphic />
        </div>
        <div>
            <h3 className="item-title">
              {title}{" "}
              <ArrowUpRight className="inline w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </h3>
          <p className="item-description">{description[0]}</p>
        </div>
      </div>
    </a>
  );
};

export default function Projects() {
  return (
    <>
      <h2 className="section-title">
        <GalleryVerticalEnd className="section-title-icon" />
        Projects
      </h2>
      <div className="content-grid">
        {data.projects.map((project, index) => (
          <ProjectNode key={index} {...project} />
        ))}
      </div>
    </>
  );
}
