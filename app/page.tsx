import Header from "./_components/Header";
import Projects from "./_components/Projects";
import Experinces from "./_components/Experiences";
import Publications from "./_components/Publications";
import Education from "./_components/Education";

export default function Home() {
  return (
    <main className="max-w-5xl flex flex-col items-center justify-center md:p-24 p-8 m-auto">
      <Header />
      <Projects />
      <Experinces />
      <Publications />
      <Education />

      {/* <--- Noise Filter --> */}
      <svg className="">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1"
            stitchTiles="stitch"
          />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
        </filter>
      </svg>
      <p>made by a human on earth</p>
    </main>
  );
}
