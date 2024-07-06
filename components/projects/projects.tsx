"use client";

import { useSearchParams } from "next/navigation";
import { ProjectImages } from "./project-images";
import { InvestmentForm } from "./investment-form";
import { Progress } from "@/components/ui/progress";

export default function Projects({ projectsInfo }) {
  const searchParams = useSearchParams();
  const searchTag = searchParams.get("tag");

  return (
    <main className="flex flex-col gap-12 max-w-6xl mx-auto">
      {projectsInfo.map((project) => {
        const progressValue = Math.round(
          (project.currentBudget / project.requiredBudget) * 100
        );
        return (
          <div
            key={project.name}
            className="flex flex-col justify-center items-center lg:flex-row gap-6 lg:items-start w-full bg-secondary rounded-md p-6 relative"
          >
            <div className="w-full md:w-3/4 lg:w-1/2 max-h-[400px] overflow-hidden">
              <ProjectImages project={project} />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <h2 className="text-xl md:text-2xl font-bold">{project.name}</h2>
              <p className="text-md md:text-lg text-muted-foreground">
                {project.description}
              </p>
              <p className="text-lg text-muted-foreground">
                Completion in {project.endDate.slice(0, 4)}
              </p>
              <p className="text-lg text-secondary-foreground">
                Required fund: ${project.requiredBudget}
              </p>
              <div className="text-lg text-secondary-foreground">
                Funding progress: {progressValue}%
                <Progress value={progressValue} />
              </div>

              <InvestmentForm projectName={project.name} />
            </div>
          </div>
        );
      })}
    </main>
  );
}
