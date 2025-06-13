import data from "@/public/data.json";
import { BriefcaseBusiness } from "lucide-react";

const ExperienceNode = ({
  company,
  image,
  description,
}: {
  company: string;
  image: any;
  description: string;
}) => (
  <div className="content-item">
    <img
      className="item-image hover:rotate-[var(--rotation)] hover:scale-105 transition-all duration-200"
      style={
        {
          "--rotation": `${Math.floor((Math.random()) * 30) - 15}deg`,
        } as React.CSSProperties
      }
      src={image}
      alt={company}
      draggable={false}
    />
    <div>
      <h3 className="item-title">{company}</h3>
      <p className="item-description">{description}</p>
    </div>
  </div>
);

export default function Experiences() {
  return (
    <>
      <h2 className="section-title">
        <BriefcaseBusiness className="section-title-icon" />
        Career
      </h2>
      <div className="content-grid">
        {data.experience.map((e, index) => (
          <ExperienceNode key={index} {...e} />
        ))}
      </div>
    </>
  );
}
