import Image from 'next/image';
import { Linkedin, Github, GraduationCap, Mail, } from "lucide-react";

const Button = ({ Icon, href}: { Icon: typeof Linkedin, href: string} ) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-1"
      >
        <button className="flex items-center space-x-1 rounded-md p-1.5 hover:scale-105 shadow-[0_4px_4px_rgba(0,0,0,0.25),inset_0_3px_0_-1.5px_rgba(60,59,62,0.75)] bg-gradient-to-b from-[#242427] to-[#19191C]"
          style={{ filter: "drop-shadow(0 25px 25px rgb(255 255 255 / 0.15))" }}
        >
          <Icon className="w-5 h-5 text-white" />
        </button>
      </a>
    );
}

export default function Header() {
    return (
      <div className="items-start justify-start w-full ">
        <div
          id="blob"
          // className="flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-900 after:via-[#0141ff] after:opacity-40 after:blur-2xl after:content-[''] before:lg:h-[360px] z-[-1]"
        ></div>
        <div className="flex space-x-3 md:flex-row flex-col">
          <Image
            src="/akendre.jpeg"
            alt="Aditya Kendre"
            className="w-16 h-16 rounded-full animate-bounce m-auto md:m-0"
            width={64}
            height={64}
            priority
            draggable={false}
          />
          <div className="items-start justify-start">
            <h1 className="text-lg font-bold">Aditya Kendre</h1>

            {/* <p */}
            {/* id="mission-statment" */}
            {/* className="mb-1 text-sm italic font-normal text-gray-500" */}
            {/* > */}
            {/* jīve doyā, kṛṣṇa-nām—sarva-dharma-sār */}
            {/* <StyledLink
                href="https://en.wikipedia.org/wiki/Bhaktivinoda_Thakur"
              >Bhaktivionda Thakur</StyledLink> */}
            {/* </p> */}
            <p>
              Scaling ideas while learning and building cool things. Founding
              team at Semant and Gaudiya Kirtan.
            </p>

            <div className="flex flex-row my-2 space-x-2">
              <Button
                Icon={Linkedin}
                href="https://www.linkedin.com/in/kendreaditya/"
              />
              <Button
                Icon={Github}
                href="https://www.github.com/kendreaditya"
              />
              <Button
                Icon={GraduationCap}
                href="https://scholar.google.com/citations?user=sx_8qkEAAAAJ&hl=en"
              />
              <Button Icon={Mail} href="mailto:adinkendre@gmail.com" />
            </div>
          </div>
        </div>
      </div>
    );
}