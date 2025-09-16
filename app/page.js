import { personalData } from "../utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import ClientWrapper from "./components/client-wrapper";
import CustomAlert from "./components/CustomAlert";
import { DynamicHeroSection, DynamicBlog } from "./components/dynamic-components";

export const revalidate = 3600; // Revalidate data every hour

async function getData() {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`,
      { next: { revalidate: 3600 } });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning>
      <CustomAlert />
      <DynamicHeroSection />
      <ClientWrapper>
        <AboutSection />
      </ClientWrapper>
      <ClientWrapper>
        <Experience />
      </ClientWrapper>
      <ClientWrapper>
        <Skills />
      </ClientWrapper>
      <ClientWrapper>
        <Projects />
      </ClientWrapper>
      <ClientWrapper>
        <Education />
      </ClientWrapper>
      <ClientWrapper>
        <ContactSection />
      </ClientWrapper>
    </div>
  );
}