import { publications, Publication } from "@/public/resume";
import { BookMarked, ArrowUpRight } from "lucide-react";

const publicationNode = (publication: Publication) => (
  <div className="flex items-center space-x-4">
    <div>
      {/* <h3 className="text-sm">{publication.title}</h3> */}
      <h3 className="text-sm">
        {publication.title}{" "}
        <a href={publication.link}>
          {" "}
          <ArrowUpRight className="inline w-5 h-5 hover:scale-110" />
        </a>
      </h3>
      <p className=" text-xs text-[#a1a1a1]">{publication.venue}</p>
    </div>
  </div>
);

export default function Publications() {
    return (
      <>
        <h2 className="items-center justify-center w-full m-3 mt-12 text-base font-semibold text-left text-white">
          <BookMarked className="inline w-5 mr-2" />
          Selected Publications
        </h2>
        <div className="grid grid-flow-row grid-cols-1 gap-3 md:grid-cols-3">
          {publications.map((e) => publicationNode(e))}
        </div>
      </>
    );
};
