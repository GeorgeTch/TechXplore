import Footer from "@/components/footer/Footer";
import { PartnersCarousel } from "@/components/projects/partners-carousel";
import Link from "next/link";

export const revalidate = 60 * 60;

export default async function Home() {
  const response = await fetch(
    "https://ideaxapp.azurewebsites.net/v1/Business"
  );
  const data = await response.json();

  return (
    <main className="h-full">
      <section
        className="relative flex items-center justify-center w-full"
        style={{
          backgroundImage: "url(/cover-platform.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "50vh",
        }}
      >
        <div className="flex items-end justify-center h-full  bg-opacity-10"></div>
      </section>
      <div className="flex items-center p-6 justify-center h-full  bg-opacity-10">
        <div className="text-center text-foreground">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 py-6">
            Real Estate Investing Made Easy
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-bold">
            Empower Your Portfolio with Property Investments
          </p>
          <Link
            href={`/projects/1`}
            className="bg-primary hover:opacity-90 hover:scale-110 text-primary-foreground font-bold py-4 px-6 rounded lg:text-2xl text-nowrap"
          >
            Explore Investment Opportunities
          </Link>
        </div>
      </div>

      {/* Partners Section */}
      <section id="partners" className="py-8 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Our Partner Companies
          </h2>
          <PartnersCarousel companyInfo={data} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
