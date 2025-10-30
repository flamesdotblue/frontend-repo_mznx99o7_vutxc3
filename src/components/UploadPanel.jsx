import { useCallback, useMemo, useRef, useState } from 'react';
import { Upload, Image as ImageIcon, FileText, Video, X, Link as LinkIcon } from 'lucide-react';

function humanSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

function FilePreview({ file, onRemove }) {
  const [text, setText] = useState('');
  const [dataUrl, setDataUrl] = useState('');

  const type = useMemo(() => file.type || 'application/octet-stream', [file]);

  // Read previews for basic types without extra dependencies
  const readPreview = useCallback(() => {
    if (type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => setDataUrl(String(e.target?.result || ''));
      reader.readAsDataURL(file);
    } else if (type.startsWith('text/') || file.name.toLowerCase().endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = e => setText(String(e.target?.result || ''));
      reader.readAsText(file);
    }
  }, [file, type]);

  // trigger once
  useMemo(() => {
    readPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white">
      <button
        onClick={onRemove}
        className="absolute right-2 top-2 z-10 hidden rounded-md bg-white/90 p-1 text-gray-700 shadow-sm hover:bg-white group-hover:block"
        aria-label="Retirer"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-3 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
          {type.startsWith('image/') ? (
            <ImageIcon className="h-6 w-6 text-gray-900" />
          ) : type.startsWith('video/') ? (
            <Video className="h-6 w-6 text-gray-900" />
          ) : (
            <FileText className="h-6 w-6 text-gray-900" />
          )}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-gray-900">{file.name}</div>
          <div className="text-xs text-gray-500">{type || 'inconnu'} · {humanSize(file.size)}</div>
        </div>
      </div>

      {/* Inline preview */}
      {type.startsWith('image/') && dataUrl && (
        <img src={dataUrl} alt={file.name} className="h-48 w-full object-cover" />
      )}

      {(type.startsWith('text/') || file.name.toLowerCase().endsWith('.txt')) && text && (
        <pre className="max-h-48 overflow-auto whitespace-pre-wrap bg-gray-50 p-4 text-xs text-gray-700">{text.slice(0, 2000)}</pre>
      )}

      {type.startsWith('video/') && (
        <div className="p-4 text-sm text-gray-600">Prévisualisation vidéo non prise en charge ici, mais le fichier est prêt à être envoyé.</div>
      )}
    </div>
  );
}

export default function UploadPanel() {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [link, setLink] = useState('');
  const [links, setLinks] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const onFiles = useCallback((fileList) => {
    const arr = Array.from(fileList || []);
    if (!arr.length) return;
    setFiles(prev => [...prev, ...arr]);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (e.dataTransfer?.files?.length) {
      onFiles(e.dataTransfer.files);
    }
  }, [onFiles]);

  const handleBrowse = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const removeFile = useCallback((idx) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const addLink = useCallback(() => {
    const trimmed = link.trim();
    if (!trimmed) return;
    try {
      // validate URL
      // eslint-disable-next-line no-new
      new URL(trimmed);
      setLinks(prev => [trimmed, ...prev]);
      setLink('');
    } catch {
      // ignore invalid
    }
  }, [link]);

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Importez vos contenus</h2>
            <p className="mt-1 text-gray-600">Glissez-déposez des fichiers ou collez un lien YouTube/URL. Aperçus immédiats pour images et textes.</p>
          </div>
          <button
            onClick={handleBrowse}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white shadow hover:bg-black"
          >
            <Upload className="h-4 w-4" /> Sélectionner des fichiers
          </button>
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => onFiles(e.target.files)}
          />
        </div>

        {/* Drop zone */}
        <div
          onDragEnter={() => setDragOver(true)}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`rounded-2xl border-2 border-dashed p-8 transition ${dragOver ? 'border-gray-900 bg-gray-50' : 'border-gray-300 bg-white'}`}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className="h-6 w-6 text-gray-700" />
            <p className="mt-2 text-sm text-gray-700">Glissez vos fichiers ici, ou</p>
            <button
              onClick={handleBrowse}
              className="mt-3 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-50"
            >
              Parcourir
            </button>
          </div>
        </div>

        {/* URL input */}
        <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2">
            <LinkIcon className="h-4 w-4 text-gray-700" />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              type="text"
              placeholder="Collez un lien (YouTube, site web, etc.)"
              className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <button
            onClick={addLink}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black"
          >
            Ajouter le lien
          </button>
        </div>

        {/* Selected files */}
        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Fichiers sélectionnés</h3>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {files.map((f, i) => (
                <FilePreview key={`${f.name}-${i}`} file={f} onRemove={() => removeFile(i)} />
              ))}
            </div>
          </div>
        )}

        {/* Added links */}
        {links.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Liens ajoutés</h3>
            <ul className="mt-3 space-y-2">
              {links.map((l, i) => (
                <li key={`${l}-${i}`} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 text-sm">
                  <a href={l} target="_blank" rel="noreferrer" className="truncate text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-500">{l}</a>
                  <button onClick={() => setLinks(prev => prev.filter((_, idx) => idx !== i))} className="text-gray-600 hover:text-gray-900">Retirer</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
