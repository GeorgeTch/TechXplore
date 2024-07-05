import Footer from "@/components/footer/Footer";
import { PartnersCarousel } from "@/components/projects/partners-carousel";

export const revalidate = 60 * 60;

export default async function Home() {
  const response = await fetch(
    "https://ideaxapp.azurewebsites.net/v1/Business"
  );
  const data = await response.json();

  return (
    <main className="h-full">
      <section
        className="bg-cover bg-center h-80"
        style={{
          backgroundImage:
            "linear-gradient(rgba(174, 172, 173, 0.6), rgba(174, 172, 173, 0.5)), url(/cover_investment.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="flex items-end justify-center h-full  bg-opacity-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Invest In Real Estate
          </h1>
        </div>
      </section>
      <div className="flex items-center justify-center h-full  bg-opacity-10">
        <div className="text-center text-foreground">
          <p className="text-xl md:text-2xl mb-8 font-bold">
            Empower Your Portfolio with Property Investments
          </p>
          <a
            href="#partners"
            className="bg-primary hover:opacity-90 hover:scale-110 text-primary-foreground font-bold py-4 px-6 rounded lg:text-2xl"
          >
            Explore Investment Opportunities
          </a>
        </div>
      </div>

      {/* Partners Section */}
      <section id="partners" className="py-16 ">
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
