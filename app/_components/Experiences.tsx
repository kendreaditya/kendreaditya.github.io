import data from "@/public/data.json";
import { BriefcaseBusiness } from "lucide-react";

const ExperienceNode = ({ company, image, description }) => (
  <div className="content-item">
    <img className="item-image" src={image} alt={company} draggable={false} />
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
