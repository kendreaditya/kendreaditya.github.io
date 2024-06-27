import { experience, Experience } from "@/public/resume";
import { BriefcaseBusiness } from 'lucide-react';

const ExperienceNode = (experience: Experience) => (
  <div className="flex items-center space-x-4">
    <img
      className="rounded-xl w-16 h-16 p-2 shadow-[0_4px_4px_rgba(0,0,0,0.25),inset_0_3px_0_-1.5px_rgba(60,59,62,0.75)] bg-gradient-to-b from-[#242427] to-[#19191C]"
      src={experience.image}
      draggable={false}
    />
    <div>
      <h3 className="text-sm">{experience.company}</h3>
      <p className=" text-xs text-[#a1a1a1]">{experience.description}</p>
    </div>
  </div>
);

export default function Experiences() {
    return (
      <>
          <h2 className="items-center justify-center w-full m-3 mt-12 text-base font-semibold text-left text-white">
            <BriefcaseBusiness className="inline w-5 mr-2"/>
            Career
          </h2>
        <div className="grid grid-flow-row grid-cols-1 gap-3 md:grid-cols-2">
          {experience.map(e => ExperienceNode(e))}
        </div>
      </>
    );
};