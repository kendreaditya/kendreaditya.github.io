import data from "@/public/data.json";
import { BookMarked, ArrowUpRight } from "lucide-react";

const PublicationNode = ({
  title,
  venue,
  link,
  authors,
  year,
}: {
  title: string;
  venue: string;
  link: string;
  authors: any;
  year: any;
}) => (
  <div className="flex flex-col space-y-1">
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block group"
    >
      <h3 className="item-title">
        {title}{" "}
        <ArrowUpRight className="inline w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
      </h3>
    </a>
    <p className="item-description">{authors.join(", ")}</p>
    <p className="item-description text-[#a1a1a1]">
      {venue}, {year}
    </p>
  </div>
);

export default function Publications() {
  return (
    <section className="w-full">
      <h2 className="section-title">
        <BookMarked className="section-title-icon" />
        Selected Publications
      </h2>
      <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {data.publications.map((publication, index) => (
          <PublicationNode key={index} {...publication} />
        ))}
      </div>
    </section>
  );
}
