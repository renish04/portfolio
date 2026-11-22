import { Hero } from "@/components/home/Hero";
import { WorkList } from "@/components/home/WorkList";
import { Experience } from "@/components/home/Experience";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { site, ui } from "@/content/site";
import { pageMetadata, person } from "@/lib/seo";
export const metadata = {
  ...pageMetadata(ui.homeTitle, site.description, "/"),
  title: { absolute: ui.homeTitle },
};
export default function Home() {
  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <WorkList />
      <Experience />
      <About />
      <Contact />
    </div>
  );
}
