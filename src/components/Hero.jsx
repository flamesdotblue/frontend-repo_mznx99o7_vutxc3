import Spline from '@splinetool/react-spline';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/kow0cKDK6Tap7xO9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle gradient to improve text contrast without blocking interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/30 to-white/90" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-2 backdrop-blur">
          <Sparkles className="h-4 w-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Construisez un cerveau virtuel pour vos projets</span>
        </div>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          Votre intelligence créative, visible sur un grand tableau vivant
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
          Déposez vos vidéos, images, PDF, liens et idées. Notre plateforme comprend, relie et
          vous aide à imaginer, écrire et planifier avec votre style.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#canvas" className="rounded-lg bg-gray-900 px-5 py-3 text-white shadow hover:bg-black transition">
            Voir le tableau
          </a>
          <a href="#features" className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-900 hover:bg-gray-50 transition">
            Comment ça marche
          </a>
        </div>
      </div>
    </section>
  );
}
