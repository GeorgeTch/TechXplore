import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div>
      <div className="flex flex-col space-x-4 ">
        <div className="space-y-2 my-10">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          {/* <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div> */}
        </div>
        <div className=" flex flex-col gap-12 max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col items-center justify-center lg:flex-row  space-y-6 lg:space-x-6">
            <Skeleton className="h-60 w-60 md:h-88 md:w-[450px]  rounded-xl" />
            <div className="space-y-6">
              <Skeleton className="h-6 w-80" />{" "}
              <Skeleton className="h-44 w-80" />{" "}
              <Skeleton className="h-4 w-80" />{" "}
              <Skeleton className="h-10 w-80" />{" "}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center lg:flex-row  space-y-6 lg:space-x-6">
            <Skeleton className="h-60 w-60 md:h-88 md:w-[450px]  rounded-xl" />
            <div className="space-y-6">
              <Skeleton className="h-6 w-80" />{" "}
              <Skeleton className="h-44 w-80" />{" "}
              <Skeleton className="h-4 w-80" />{" "}
              <Skeleton className="h-10 w-80" />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
