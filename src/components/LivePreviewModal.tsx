import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Monitor, Smartphone, X } from 'lucide-react';
import { asset } from '../lib/config';
import type { LiveSite } from '../data/live';

/** Preview for a real, live store: a full-page snapshot (desktop or mobile) of the actual website. */
export default function LivePreviewModal({ site, onClose, onUse }: { site: LiveSite; onClose: () => void; onUse: () => void }) {
  const [mode, setMode] = useState<'desktop' | 'mobile'>('desktop');
  const dlg = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden'; dlg.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dlg.current) {
        const f = dlg.current.querySelectorAll<HTMLElement>('button, a[href]'); if (!f.length) return;
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = ''; prev?.focus(); };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dlg} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="lv-title" className="relative flex h-[92dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl outline-none">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div><h2 id="lv-title" className="text-lg font-semibold text-heading">{site.name}</h2><p className="mt-1 text-sm text-paragraph">A live store built for a real client. This is a snapshot of {site.domain}; open the live site to browse it.</p></div>
          <button onClick={onClose} aria-label="Close" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-paragraph hover:bg-muted"><X size={20} /></button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <a href={site.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-4">Visit {site.domain} <ExternalLink size={14} /></a>
          <div className="flex gap-2">
            {([['desktop', Monitor, 'Desktop'], ['mobile', Smartphone, 'Mobile']] as const).map(([k, I, l]) => (
              <button key={k} onClick={() => setMode(k)} aria-pressed={mode === k} className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold ${mode === k ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-white text-heading hover:bg-muted'}`}><I size={16} />{l}</button>))}
          </div>
        </div>
        <div className={`min-h-0 flex-1 px-3 pb-3 sm:px-5 ${mode === 'mobile' ? 'bg-[#f4f4f5] pt-5' : 'bg-[#e9e9ea]'}`}>
          <div className={`mx-auto h-full overflow-y-auto overflow-x-hidden bg-white transition-[max-width] duration-300 ${mode === 'mobile' ? 'max-w-[430px] rounded-[28px] border border-border shadow-[0_10px_40px_rgba(0,0,0,.18)]' : 'max-w-full rounded-t-lg shadow-inner'}`}>
            <img key={mode} src={asset(`live/${site.id}-${mode}.jpg`)} alt={`${site.name} ${mode} homepage snapshot`} className="block w-full" decoding="async" />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-white px-5 py-3">
          <button onClick={onUse} className="btn btn-primary">Use this reference</button>
          <button onClick={onClose} className="btn border border-border bg-white text-heading hover:bg-muted">Back to design references</button>
        </div>
      </div>
    </div>
  );
}
