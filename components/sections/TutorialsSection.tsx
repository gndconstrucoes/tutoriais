"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
  category: 'CertOne' | 'ERP UAU' | 'GD4';
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
}

const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Como criar documentos e assinar no CertOne',
    description: 'Aprenda a cadastrar e assinar documentos no CertOne.',
    embedUrl: 'https://embed.app.guidde.com/playbooks/kuhzGKEckDtEMCr4mTGsrV',
    category: 'CertOne',
    level: 'Iniciante'
  },
  {
    id: '2',
    title: 'Funcionalidades Avançadas do CertOne',
    description: 'Explore recursos avançados e melhores práticas do CertOne.',
    embedUrl: '',
    category: 'CertOne',
    level: 'Avançado'
  },
  {
    id: '3',
    title: 'Primeiros Passos com ERP UAU',
    description: 'Comece sua jornada com o ERP UAU e aprenda as funcionalidades básicas.',
    embedUrl: '',
    category: 'ERP UAU',
    level: 'Iniciante'
  },
  {
    id: '4',
    title: 'Gestão Financeira no ERP UAU',
    description: 'Aprenda a gerenciar finanças e relatórios no ERP UAU.',
    embedUrl: '',
    category: 'ERP UAU',
    level: 'Intermediário'
  },
  {
    id: '5',
    title: 'Introdução ao GD4',
    description: 'Conheça a plataforma GD4 e suas principais funcionalidades.',
    embedUrl: '',
    category: 'GD4',
    level: 'Iniciante'
  },
  {
    id: '6',
    title: 'Recursos Avançados do GD4',
    description: 'Explore funcionalidades avançadas e integrações do GD4.',
    embedUrl: '',
    category: 'GD4',
    level: 'Avançado'
  },
];

const levelColors = {
  'Iniciante': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  'Intermediário': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  'Avançado': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
};

export function TutorialsSection() {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Tutorial['category'] | 'Todos'>('Todos');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredTutorials = selectedCategory === 'Todos'
    ? tutorials
    : tutorials.filter(tutorial => tutorial.category === selectedCategory);

  const categories: Array<Tutorial['category'] | 'Todos'> = ['Todos', 'CertOne', 'ERP UAU', 'GD4'];

  const openFullscreen = (tutorial: Tutorial) => {
    if (tutorial.embedUrl) {
      setSelectedTutorial(tutorial);
    }
  };

  const closeFullscreen = () => {
    setSelectedTutorial(null);
    setIsFullscreen(false);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if ((containerRef.current as any).webkitRequestFullscreen) {
          await (containerRef.current as any).webkitRequestFullscreen();
        } else if ((containerRef.current as any).msRequestFullscreen) {
          await (containerRef.current as any).msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  const ResponsiveIframe = ({ src, title }: { src: string; title: string }) => (
    <div className="relative aspect-video w-full">
      {src ? (
        <iframe
          className="absolute inset-0 w-full h-full rounded-lg"
          src={src}
          title={title}
          frameBorder="0"
          referrerPolicy="unsafe-url"
          allowFullScreen={true}
          allow="clipboard-write"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-forms allow-same-origin allow-presentation"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500">Vídeo em breve</span>
        </div>
      )}
    </div>
  );

  return (
    <div id="tutorials" className="py-12 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl text-gray-900 dark:text-white">
            Nossos Tutoriais
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore nossa coleção de tutoriais interativos e aprenda no seu próprio ritmo.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredTutorials.map((tutorial) => (
            <motion.div
              layout
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="group bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 dark:shadow-gray-900/30"
            >
              <div className={tutorial.embedUrl ? "cursor-pointer" : ""} onClick={() => tutorial.embedUrl && openFullscreen(tutorial)}>
                <ResponsiveIframe src={tutorial.embedUrl} title={tutorial.title} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-primary">
                      {tutorial.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelColors[tutorial.level]}`}>
                      {tutorial.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="text-muted-foreground">{tutorial.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {selectedTutorial && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div 
              ref={containerRef}
              className="relative w-full h-full max-w-7xl max-h-[90vh] m-4 bg-card rounded-xl shadow-2xl"
            >
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  onClick={toggleFullscreen}
                  className="text-card-foreground bg-secondary/50 backdrop-blur-sm rounded-full p-2 hover:bg-secondary/80 transition-colors"
                  title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isFullscreen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 9V4.5M9 9H4.5M15 9h4.5M15 9V4.5M9 15v4.5M9 15H4.5M15 15h4.5M15 15v4.5"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                      />
                    )}
                  </svg>
                </button>
                <button
                  onClick={closeFullscreen}
                  className="text-card-foreground bg-secondary/50 backdrop-blur-sm rounded-full p-2 hover:bg-secondary/80 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 h-full">
                <ResponsiveIframe src={selectedTutorial.embedUrl} title={selectedTutorial.title} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
