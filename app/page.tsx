import Header from "./_components/Header";
import Projects from "./_components/Projects";
import Experiences from "./_components/Experiences";
import Publications from "./_components/Publications";
import Education from "./_components/Education";
import Blog from "./_components/Blog";

export default function Home() {
  return (
    <main className="max-w-5xl flex flex-col justify-center md:p-24 p-8 m-auto">
      <Header />
      <Experiences />
      <Projects />
      <Publications />
      <Education />
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <filter
            id="noiseFilter"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
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
        </defs>
      </svg>
      <footer className="mt-16 pt-6 border-t border-white/5 flex justify-center">
        <p className="item-description">made by a human on earth</p>
      </footer>
    </main>
  );
}
