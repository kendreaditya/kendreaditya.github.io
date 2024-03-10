import {experience, Experience } from "@/public/resume";

const timelineNode = (experience: Experience) => (
  <li className="mb-10 ms-4">
    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700 animate-ping"></div>
    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
      {experience.dates}
    </time>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
      {experience.title}
    </h3>
    <h4 className="text-base font-normal text-white italic">
      {experience.company}
    </h4>
    <ul className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 list-disc px-4">
      {experience.description.map((line, idx) => (
        <li key={idx}>{line}</li>
      ))}
    </ul>
  </li>
)

export default function Experiences() {
    return (
        <>
            <h2 className="text-3xl font-semibold text-gray-600 text-left w-full m-3 mt-12">
                experinces
            </h2>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {experience.map((exp, idx) => timelineNode(exp))}
            </ol>
        </>
    )
};