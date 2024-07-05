import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div>
      <div className="flex flex-col space-x-4 my-10">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          {/* <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div> */}
        </div>
        <div className=" my-24 grid md:grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-60 w-60 md:h-88 md:w-[450px]  rounded-xl" />
            <Skeleton className="h-4 w-[250px]" />{" "}
            <Skeleton className="h-4 w-[250px]" />{" "}
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-60 w-60 md:h-88 md:w-[450px]  rounded-xl" />
            <Skeleton className="h-4 w-[250px]" />{" "}
            <Skeleton className="h-4 w-[250px]" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
