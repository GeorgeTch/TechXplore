import { getReviewAverage } from "@/lib/review-average";
import AddToCart from "@/components/cart/add-to-cart";
import Projects from "@/components/projects/projects";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import imgPlaceholder from "@/public/image-placeholder.jpg";

export const revalidate = 0;

export async function generateStaticParams() {
  const response = await fetch(
    "https://ideaxapp.azurewebsites.net/v1/Business"
  );
  const projectsInfo = await response.json();

  return projectsInfo.map((project) => ({ slug: project.id.toString() }));
}

export default async function page({ params }: { params: { slug: string } }) {
  try {
    const response = await fetch(
      `https://ideaxapp.azurewebsites.net/v1/Business/${params.slug}`
    );

    let data;
    if (response.ok) {
      data = await response.json();
    }
    const res = await fetch(
      `https://ideaxapp.azurewebsites.net/v1/Image/${data.image.url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      }
    );
    const blob = await res.blob();
    const logoUrl = URL.createObjectURL(blob);

    // Fetch the blob URLs for project images
    const projectsWithBlobUrls = await Promise.all(
      data.projects.map(async (project) => {
        const imagesWithBlobUrls = await Promise.all(
          project.images.map(async (image) => {
            const response = await fetch(
              `https://ideaxapp.azurewebsites.net/v1/Image/${image.url}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/octet-stream",
                },
              }
            );
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            return {
              ...image,
              blobUrl,
            };
          })
        );
        return {
          ...project,
          images: imagesWithBlobUrls,
        };
      })
    );

    return (
      <main>
        <section className="flex flex-col py-5 gap-4 lg:flex-row lg:gap-12">
          <div className="">
            {/* <img
              className="rounded-t-md w-full h-auto"
              src={logoUrl || imgPlaceholder.src}
              width={720}
              height={480}
              alt={data.name}
              loading="lazy"
            /> */}
          </div>
          <div className="flex flex-col flex-2">
            <h2 className="text-2xl md:text-4xl font-bold p-2">{data.name}</h2>
            <div>
              <p className="text-md md:text-lg text-muted-foreground">
                Constructed since {data.creationDate.slice(0, 4)}
              </p>
            </div>
            <Separator className="my-2" />
            <Projects projectsInfo={projectsWithBlobUrls} />
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Invalid Company ID: ", error);
  }
}
