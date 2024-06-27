import type { Education } from "@/public/resume";
import { education } from "@/public/resume";
import { School } from "lucide-react";

const EducationNode = ({ title, description, image }: Education) => (
  <div className="flex items-start w-full h-full space-x-4">
    <img
      className="rounded-xl w-16 h-16 p-2 shadow-[0_4px_4px_rgba(0,0,0,0.25),inset_0_3px_0_-1.5px_rgba(60,59,62,0.75)] bg-gradient-to-b from-[#242427] to-[#19191C] flex-shrink-0"
      src={image}
      alt={title}
      draggable={false}
    />
    <div className="flex flex-col justify-between w-full h-full">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-[#a1a1a1] flex-grow">{description}</p>
    </div>
  </div>
);

export default function Education() {
  return (
    <div className="w-full">
      <h2 className="flex items-center w-full m-3 mt-12 text-base font-semibold text-left text-white">
        <School className="w-5 mr-2" />
        Education
      </h2>
      <div className="grid grid-flow-row grid-cols-1 gap-3 md:grid-cols-2">
        {education.map((e, index) => (
          <div key={index} className="h-full">
            <EducationNode {...e} />
          </div>
        ))}
      </div>
    </div>
  );
}
