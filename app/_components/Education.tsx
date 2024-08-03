import data from "@/public/data.json";
import { School } from "lucide-react";

const EducationNode = ({ title, description, image }: { title: string, description: string, image: any }) => (
  <div className="content-item">
    <img className="item-image" src={image} alt={title} draggable={false} />
    <div className="flex flex-col justify-between w-full h-full">
      <h3 className="item-title">{title}</h3>
      <p className="item-description">{description}</p>
    </div>
  </div>
);

export default function Education() {
  return (
    <div className="w-full">
      <h2 className="section-title">
        <School className="section-title-icon" />
        Education
      </h2>
      <div className="content-grid">
        {data.education.map((e, index) => (
          <div key={index} className="h-full">
            <EducationNode {...e} />
          </div>
        ))}
      </div>
    </div>
  );
}
