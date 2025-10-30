import { Video, Image, FileText, Mic, Link as LinkIcon } from 'lucide-react';

export default function UploadTypes() {
  const items = [
    { icon: <Video className="h-5 w-5 text-gray-900" />, title: 'Vidéo', desc: 'Fichiers ou liens YouTube' },
    { icon: <Image className="h-5 w-5 text-gray-900" />, title: 'Image', desc: 'Moodboards, références' },
    { icon: <FileText className="h-5 w-5 text-gray-900" />, title: 'PDF & Texte', desc: 'Notes, recherches' },
    { icon: <Mic className="h-5 w-5 text-gray-900" />, title: 'Voix', desc: 'Idées dictées' },
    { icon: <LinkIcon className="h-5 w-5 text-gray-900" />, title: 'Liens', desc: 'Ressources web' }
  ];

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Alimentez votre cerveau</h3>
              <p className="mt-1 text-gray-600">Plus vous lui donnez de contenus, plus il devient expert avec votre style.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {items.map((it, i) => (
                <div key={i} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">{it.icon}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{it.title}</div>
                    <div className="text-xs text-gray-500">{it.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
