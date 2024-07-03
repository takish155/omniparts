import HeroSection from "@/components/home/hero-section";
import dynamic from "next/dynamic";
import FeaturedSectionSkeleton from "@/components/skeleton/featured-section-skeleton";

const FeaturedCPUSection = dynamic(
  () => import("@/components/home/section/featured-cpu"),
  { loading: () => <FeaturedSectionSkeleton /> }
);

const RecommendedPartsSection = dynamic(
  () => import("@/components/home/section/recommended-parts")
);

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedCPUSection />
      <RecommendedPartsSection />
    </main>
  );
}
