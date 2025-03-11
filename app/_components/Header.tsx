import Image from "next/image";
import { Linkedin, Github, GraduationCap, Mail } from "lucide-react";
import data from "@/public/data.json";

const iconMap = {
  Linkedin,
  Github,
  GraduationCap,
  Mail,
};

const Button = ({
  Icon,
  href,
}: {
  Icon: keyof typeof iconMap;
  href: string;
}) => {
  const IconComponent = iconMap[Icon];
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <button className="link-button">
        <IconComponent className="w-5 h-5 text-white" />
      </button>
    </a>
  );
};

export default function Header() {
  const { name, bio, image, imagev2, links } = data.personalInfo;
  return (
    <div className="items-start justify-start w-full">
      <div id="blob"></div>
      <div className="flex space-x-3 md:flex-row flex-col">
        <div className="relative w-16 h-16 m-auto md:m-0">
          <Image
        src={imagev2}
        alt={name}
        className="absolute w-16 h-16 rounded-full aspect-square"
        width={64}
        height={64}
        priority
        draggable={false}
          />
          <Image
        src={image}
        alt={name}
        className="absolute w-16 h-16 rounded-full hover:opacity-0 aspect-square"
        width={64}
        height={64}
        priority
        draggable={false}
          />
        </div>
        <div className="items-start justify-start">
          <h1 className="text-lg font-bold">{name}</h1>
          <p>{bio}</p>
          <div className="flex flex-row my-2 space-x-2">
        {links.map((link, index) => (
          <Button
            key={index}
            Icon={link.icon as keyof typeof iconMap}
            href={link.href}
          />
        ))}
          </div>
        </div>
      </div>
    </div>
  );
}
