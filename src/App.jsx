import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import CanvasPreview from './components/CanvasPreview';
import UploadTypes from './components/UploadTypes';
import UploadPanel from './components/UploadPanel';

function App() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Hero />
      <UploadTypes />
      <UploadPanel />
      <CanvasPreview />
      <FeaturesGrid />

      <footer className="border-t border-gray-200 bg-white py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Votre Cerveau Créatif</p>
          <div className="flex gap-3">
            <a href="#canvas" className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">Commencer</a>
            <a href="#features" className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 hover:bg-gray-50">En savoir plus</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
