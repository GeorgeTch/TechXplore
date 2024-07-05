import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className=" w-full">
      <div className="flex items-center justify-center space-x-4 my-10">
        <div className="flex flex-col items-center justify-center space-y-4 my-10">
          <Skeleton className="h-80 w-[1000px]" />
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
