import { projects, Project } from "@/public/resume";

const projectNode = (project: Project) => (
    <div>
      <h3 className="mb-2 text-xl font-bold dark:text-white">
        {project.title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        {project.description}
      </p>
    </div>
);

export default function Projects() {
    return (
        <>
            <h2 className="text-3xl font-semibold text-gray-600 mt-12 text-left w-full m-3">
                projects that im proud of
            </h2>

            <div className="mx-auto max-w-screen-xl">
                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                {projects.map((project, idx) => projectNode(project))}
                </div>
            </div>
        </>
    )
};