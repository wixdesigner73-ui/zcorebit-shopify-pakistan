import { MessageCircle } from 'lucide-react';
import { asset } from '../lib/config';
import { scrollToId } from '../lib/store';
import { config } from '../lib/config';

export default function Header() {
  const wa = config.whatsappNumber ? `https://wa.me/${config.whatsappNumber}` : undefined;
  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-white/10 bg-[#07090b]/95 backdrop-blur">
      <div className="mx-auto flex h-[96px] max-w-[1296px] items-center justify-between px-4 md:px-0 sm:px-6 xl:px-0">
        <a href={asset('/')} aria-label="Zevitech home">
          <img src={asset('assets/logo-white.png')} width={140} height={63} alt="Zevitech" className="h-auto w-24 md:w-32" />
        </a>
        <nav className="flex items-center gap-3 sm:gap-5" aria-label="Primary">
          <a href="#pakistan-designs" onClick={e => { e.preventDefault(); scrollToId('pakistan-designs'); }} className="text-sm font-semibold text-white hover:text-white/80">Designs</a>
          <a href="#pakistan-enquiry" onClick={e => { e.preventDefault(); scrollToId('pakistan-enquiry'); }} className="rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-white animation-standard hover:bg-primary-hover sm:px-4">Get my store plan</a>
          <a href={wa} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" aria-disabled={!wa}
            onClick={e => { if (!wa) { e.preventDefault(); scrollToId('pakistan-enquiry'); } }}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/70 text-white animation-standard hover:bg-white/10">
            <MessageCircle size={20} />
          </a>
        </nav>
      </div>
    </header>
  );
}
