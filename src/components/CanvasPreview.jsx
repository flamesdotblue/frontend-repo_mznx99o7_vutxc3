import { ZoomIn, ZoomOut, Move, Plus } from 'lucide-react';
import { useMemo } from 'react';

export default function CanvasPreview() {
  // Static mock data to illustrate the concept visually
  const nodes = useMemo(() => ([
    { id: '1', x: 80, y: 120, label: 'Brief Vidéo', tone: 'énergie' },
    { id: '2', x: 300, y: 80, label: 'Citations PDF', tone: 'expert' },
    { id: '3', x: 260, y: 240, label: 'Moodboard Images', tone: 'visuel' },
    { id: '4', x: 460, y: 180, label: 'Plan éditorial', tone: 'clair' }
  ]), []);

  const edges = useMemo(() => ([
    ['1', '2'],
    ['2', '4'],
    ['1', '3'],
    ['3', '4']
  ]), []);

  return (
    <section id="canvas" className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Votre tableau d'idées</h2>
            <p className="mt-2 max-w-2xl text-gray-600">Chaque nœud est une idée, une source ou une synthèse. Reliez-les pour voir votre pensée prendre forme.</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-50">
              <Plus className="h-4 w-4" /> Nouveau nœud
            </button>
            <div className="inline-flex overflow-hidden rounded-lg border border-gray-300 bg-white">
              <button className="p-2 hover:bg-gray-50" aria-label="move"><Move className="h-4 w-4 text-gray-700" /></button>
              <button className="p-2 hover:bg-gray-50" aria-label="zoom in"><ZoomIn className="h-4 w-4 text-gray-700" /></button>
              <button className="p-2 hover:bg-gray-50" aria-label="zoom out"><ZoomOut className="h-4 w-4 text-gray-700" /></button>
            </div>
          </div>
        </div>

        <div className="relative mt-6 h-[420px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {/* edges */}
          <svg className="absolute inset-0 h-full w-full">
            {edges.map(([a, b], i) => {
              const A = nodes.find(n => n.id === a);
              const B = nodes.find(n => n.id === b);
              if (!A || !B) return null;
              return (
                <line key={i} x1={A.x + 120} y1={A.y + 36} x2={B.x + 120} y2={B.y + 36} stroke="#e5e7eb" strokeWidth="2" />
              );
            })}
          </svg>

          {/* nodes */}
          {nodes.map(n => (
            <div key={n.id} className="absolute select-none rounded-xl border border-gray-200 bg-white/90 p-4 shadow-sm backdrop-blur" style={{ left: n.x, top: n.y, width: 240 }}>
              <div className="text-xs uppercase tracking-wide text-gray-400">Nœud</div>
              <div className="mt-1 text-base font-semibold text-gray-900">{n.label}</div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> ton : {n.tone}
              </div>
            </div>
          ))}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white" />
        </div>
      </div>
    </section>
  );
}
