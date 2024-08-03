import data from "@/public/data.json";
import { BookMarked, ArrowUpRight } from "lucide-react";

const PublicationNode = ({ title, venue, link, authors, year }) => (
  <div className="flex flex-col space-y-1">
    <h3 className="item-title group">
      {title}{" "}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transition-transform group-hover:translate-x-1"
      >
        <ArrowUpRight className="inline w-4 h-4 text-blue-400" />
      </a>
    </h3>
    <p className="item-description">{authors.join(", ")}</p>
    <p className="item-description text-gray-400">
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
