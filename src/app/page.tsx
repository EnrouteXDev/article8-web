import { AboutSection } from "@/components/sections/about";
import { HeroSection } from "@/components/sections/hero";
import { ArtifactsSection } from "@/components/sections/artifacts";
import { BehindTheScenesSection } from "@/components/sections/behind-the-scenes";
import { ContactSection } from "@/components/sections/contact";



export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ArtifactsSection />
      <BehindTheScenesSection />
      {/* <TeamSection />
      <Sponsors /> */}
      <ContactSection />
    </>
  );
}
