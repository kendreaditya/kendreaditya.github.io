import Image from 'next/image';

export default function Header() {
    return (
        <>
        <div
            id="blob"
            className="animate-pulse relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"
        ></div>
        <div className="flex flex-col md:flex-row items-center justify-center space-x-3">
            <Image
            src="/akendre.jpeg"
            alt="Aditya Kendre"
            className="rounded-full animate-bounce"
            width={56}
            height={56}
            priority
            draggable={false}
            />
            <h1 className="font-bold text-5xl text-center">Aditya Kendre</h1>
        </div>
        <p
            id="mission-statment"
            className="text-sm font-normal italic text-gray-500 text-center"
        >
            jīve doyā, kṛṣṇa-nām—sarva-dharma-sār
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-x-3">
            <a
            href="https://www.linkedin.com/in/kendreaditya/"
            className="underline"
            >
            /in/kendreaditya
            </a>
            <a href="https://www.github.com/kendreaditya" className="underline">
            /github/kendreaditya
            </a>
            <a href="mailto:adinkendre@gmail.com" className="underline">
            /gmail/adinkendre
            </a>
        </div>
      </>
    );
}