import { Brain, Image, Video, Link as LinkIcon, FileText, Mic, Network, PenSquare } from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    {
      icon: <Video className="h-6 w-6 text-gray-900" />,
      title: 'Vidéos & Liens YouTube',
      desc: 'Ajoutez vos vidéos ou collez un lien : nous en extrayons les idées clés, chapitres et citations.'
    },
    {
      icon: <Image className="h-6 w-6 text-gray-900" />,
      title: 'Images',
      desc: 'Analyse visuelle des images pour détecter concepts, thèmes, et styles.'
    },
    {
      icon: <FileText className="h-6 w-6 text-gray-900" />,
      title: 'PDF & Textes',
      desc: 'Compréhension profonde des documents pour résumer, structurer et référencer.'
    },
    {
      icon: <Mic className="h-6 w-6 text-gray-900" />,
      title: 'Voix',
      desc: 'Transcription et extraction d’idées depuis vos mémos vocaux.'
    },
    {
      icon: <Brain className="h-6 w-6 text-gray-900" />,
      title: 'Cerveau virtuel',
      desc: 'Chaque projet apprend de vos contenus pour répondre avec votre ton et votre expertise.'
    },
    {
      icon: <Network className="h-6 w-6 text-gray-900" />,
      title: 'Nœuds reliés',
      desc: 'Chaque idée devient une bulle connectée. Reliez, organisez, zoomez, et naviguez.'
    },
    {
      icon: <PenSquare className="h-6 w-6 text-gray-900" />,
      title: 'Génération de contenu',
      desc: 'Briefs, plans éditoriaux, posts, scripts et copies alignés à votre style.'
    },
    {
      icon: <LinkIcon className="h-6 w-6 text-gray-900" />,
      title: 'Connectez tout',
      desc: 'Mélangez sources et formats pour créer de nouvelles idées à partir de vos savoirs.'
    }
  ];

  return (
    <section id="features" className="relative bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Tout ce que vous donnez, il le comprend</h2>
        <p className="mt-3 max-w-3xl text-gray-600">Une base créative qui apprend en continu et vous aide à produire mieux, plus vite.</p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">{f.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
