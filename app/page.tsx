import { HeroGeometric } from "@/components/HeroGeometric";
import { TutorialsSection } from "@/components/sections/TutorialsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroGeometric 
        badge="Portal de Tutoriais"
        title1="Aprenda com"
        title2="Tutoriais Interativos"
        description="Explore nossa coleção de tutoriais interativos e eleve suas habilidades ao próximo nível com conteúdo prático e envolvente."
      />
      <TutorialsSection />
    </main>
  );
} 