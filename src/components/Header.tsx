import Logo from './Logo';
import { MessageCircle } from 'lucide-react';
import { asset } from '../lib/config';
import { scrollToId } from '../lib/store';
import { config } from '../lib/config';

export default function Header() {
  const wa = config.whatsappNumber ? `https://wa.me/${config.whatsappNumber}` : undefined;
  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-white/10 bg-[#050505]/95 backdrop-blur">
      <div className="mx-auto flex h-[96px] max-w-[1296px] items-center justify-between px-4 md:px-0 sm:px-6 xl:px-0">
        <a href={asset('/')} aria-label="Zcorebit home">
          <Logo />
        </a>
        <nav className="flex items-center gap-3 sm:gap-5" aria-label="Primary">
          <a href="#pakistan-designs" onClick={e => { e.preventDefault(); scrollToId('pakistan-designs'); }} className="text-[11px] font-bold uppercase tracking-[.08em] text-white hover:text-white/80">Designs</a>
          <a href="#pakistan-enquiry" onClick={e => { e.preventDefault(); scrollToId('pakistan-enquiry'); }} className="rounded-full bg-gradient-to-br from-[#ff8a4c] to-[#f06927] px-3 py-2.5 text-[11px] font-bold uppercase tracking-[.08em] text-primary-foreground animation-standard hover:bg-primary-hover sm:px-4">Get my store plan</a>
          <a href={wa} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" aria-disabled={!wa}
            onClick={e => { if (!wa) { e.preventDefault(); scrollToId('pakistan-enquiry'); } }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-white animation-standard hover:bg-white/10">
            <MessageCircle size={20} />
          </a>
        </nav>
      </div>
    </header>
  );
}
