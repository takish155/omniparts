import HeroSection from "@/components/home/hero-section";
import dynamic from "next/dynamic";
import FeaturedSectionSkeleton from "@/components/skeleton/featured-section-skeleton";
import { getTranslations } from "next-intl/server";

const FeaturedCPUSection = dynamic(
  () => import("@/components/home/section/featured-cpu"),
  { loading: () => <FeaturedSectionSkeleton /> }
);

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedCPUSection />
    </main>
  );
}

export async function generateMetadata() {
  const t = await getTranslations("indexpage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}
