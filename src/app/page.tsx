import FounderMessage from "@/Components/FounderMessage";
import HeroSection from "@/Components/HeroSection";
import HowInvestmentModel from "@/Components/HowInvestmentModel";
import HowitWorks from "@/Components/HowItWorks";
import InvestForm from "@/Components/InvestForm";
import OurProjects from "@/Components/OurProjects";

export default function Home() {
  return (
    <div className="px-(--container-padding) pt-4">
      <HeroSection />
      <OurProjects />
      <HowitWorks />
      <HowInvestmentModel />
      <FounderMessage />
      <InvestForm />
    </div>
  );
}
