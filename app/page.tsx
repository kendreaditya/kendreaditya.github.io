import Header from "./_components/Header";
import Bio from "./_components/Bio";
import Projects from "./_components/Projects";
import Experinces from "./_components/Experiences";

export default function Home() {
  return (
    <main className="max-w-6xl flex flex-col items-center justify-center md:p-24 p-8 m-auto">
      <Header />
      <Bio />
      <Projects />
      <Experinces />

      {/* <--- Noise Filter --> */}
      <svg>
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
