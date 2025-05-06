import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Aprenda com os Melhores Tutoriais
        </h1>
        <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
          Explore nossa coleção de tutoriais interativos e aprenda de forma prática e eficiente.
        </p>
        <div className="mt-10">
          <Link
            href="#tutorials"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
          >
            Explorar Tutoriais
          </Link>
        </div>
      </div>
    </div>
  );
} 