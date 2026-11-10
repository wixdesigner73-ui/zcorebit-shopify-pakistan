import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { packageOptions } from '../data/content';
import { saveEnquiry, whatsappUrl, NotConfiguredError, type Enquiry } from '../lib/enquiry';
import { setSel, useSel } from '../lib/store';

type Errors = Partial<Record<'full_name' | 'whatsapp' | 'email' | 'business_name' | 'description' | 'consent', string>>;
const offers = ['Products', 'Services', 'Products and services'];

function validate(v: Enquiry): Errors {
  const e: Errors = {};
  if (v.full_name.trim().length < 2) e.full_name = 'Please enter your full name.';
  if (!/^\+?[\d\s-]{7,16}$/.test(v.whatsapp.trim())) e.whatsapp = 'Enter a valid WhatsApp / mobile number, e.g. 03XX XXXXXXX.';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (!v.business_name.trim()) e.business_name = 'Please enter your business name.';
  if (v.description.trim().length < 5) e.description = 'Tell us a little about your business.';
  if (!v.consent) e.consent = 'Please agree so we can contact you about this project.';
  return e;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-heading">{label}<span className="sr-only"> (required)</span></label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function LeadForm() {
  const sel = useSel();
  const [v, setV] = useState({ full_name: '', whatsapp: '', email: '', business_name: '', description: '', consent: false, honey: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const [wa, setWa] = useState<string | null>(null);

  useEffect(() => { setErrors(e => e); }, [sel.pkg]);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setV(p => ({ ...p, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));
  const ia = (k: keyof Errors) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `lf-${k}-err` : undefined });

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (v.honey) return; // bot trap
    const data: Enquiry = { full_name: v.full_name.trim(), whatsapp: v.whatsapp.trim(), email: v.email.trim(), business_name: v.business_name.trim(), offer: sel.offer, package_interest: sel.pkg, description: v.description.trim(), design_reference: sel.design, consent: v.consent };
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) { document.getElementById(`lf-${Object.keys(errs)[0]}`)?.focus(); return; }
    setState('saving'); setMsg('');
    try {
      await saveEnquiry(data);
    } catch (err) {
      setState('error');
      setMsg(err instanceof NotConfiguredError
        ? 'Your enquiry could not be saved because storage is not configured on this site yet. Nothing was sent. Please contact us on WhatsApp directly.'
        : 'We could not save your enquiry. Nothing was sent, so please try again in a moment.');
      return;
    }
    const url = whatsappUrl(data);
    setWa(url); setState('done');
    if (url) window.open(url, '_blank', 'noopener');
  }

  if (state === 'done') {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8" role="status">
        <CheckCircle2 className="mb-3 text-tertiary" size={36} />
        <h2 className="text-2xl font-medium text-heading">Your enquiry is saved.</h2>
        <p className="mt-2 text-paragraph">{wa ? 'WhatsApp should now be open. Tap Send to start the conversation with your project manager. If it did not open, use the button below.' : 'Thank you. Your project manager will contact you shortly.'}</p>
        {wa && <a href={wa} target="_blank" rel="noreferrer" className="btn btn-primary mt-5 w-full">Open WhatsApp <ArrowRight size={17} /></a>}
        <button type="button" onClick={() => { setState('idle'); setV(p => ({ ...p, description: '', consent: false })); }} className="mt-3 text-sm font-semibold text-primary underline">Send another enquiry</button>
      </div>
    );
  }

  return (
    <form id="pakistan-enquiry-form" onSubmit={onSubmit} noValidate className="rounded-2xl bg-white p-6 shadow-xl sm:p-6" aria-labelledby="lf-title">
      <h2 id="lf-title" className="text-2xl font-medium text-heading">Get your store plan</h2>
      <p className="mt-2 text-sm text-paragraph">Tell us about your business. No payment required. <span className="sr-only">Your contact and business details</span></p>
      <div className="mt-6 grid gap-x-3 gap-y-4 sm:grid-cols-2">
        <Field id="lf-full_name" label="Full name" error={errors.full_name}><input id="lf-full_name" className="field" autoComplete="name" value={v.full_name} onChange={set('full_name')} {...ia('full_name')} /></Field>
        <Field id="lf-whatsapp" label="WhatsApp / mobile number" error={errors.whatsapp}><input id="lf-whatsapp" className="field" inputMode="tel" autoComplete="tel" placeholder="03XX XXXXXXX" value={v.whatsapp} onChange={set('whatsapp')} {...ia('whatsapp')} /></Field>
        <Field id="lf-email" label="Email address" error={errors.email}><input id="lf-email" type="email" className="field" autoComplete="email" value={v.email} onChange={set('email')} {...ia('email')} /></Field>
        <Field id="lf-business_name" label="Business name" error={errors.business_name}><input id="lf-business_name" className="field" autoComplete="organization" value={v.business_name} onChange={set('business_name')} {...ia('business_name')} /></Field>
        <Field id="lf-offer" label="What do you offer?">
          <div className="relative"><select id="lf-offer" className="field appearance-none pr-12" value={sel.offer} onChange={e => setSel({ offer: e.target.value })}>{offers.map(o => <option key={o}>{o}</option>)}</select><Chev /></div>
        </Field>
        <Field id="lf-pkg" label="Package interest">
          <div className="relative"><select id="lf-pkg" className="field appearance-none pr-12" value={sel.pkg} onChange={e => setSel({ pkg: e.target.value })}>{packageOptions.map(o => <option key={o}>{o}</option>)}</select><Chev /></div>
        </Field>
      </div>
      {sel.design && <p className="mt-3 rounded-lg bg-[#fff3ea] px-3 py-2 text-sm text-heading">Design reference: <strong>{sel.design}</strong> <button type="button" className="ml-1 text-primary underline" onClick={() => setSel({ design: '' })}>remove</button></p>}
      <div className="mt-4">
        <Field id="lf-description" label="Tell us about your business" error={errors.description}>
          <textarea id="lf-description" rows={3} className="field resize-y py-3" placeholder="What do you sell, and what would you like your website to do?" value={v.description} onChange={set('description')} {...ia('description')} />
        </Field>
      </div>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true"><label>Leave this empty<input tabIndex={-1} autoComplete="off" value={v.honey} onChange={set('honey')} /></label></div>
      <div className="mt-4 flex items-start gap-3">
        <input id="lf-consent" type="checkbox" checked={v.consent} onChange={set('consent')} className="mt-1 h-5 w-5 shrink-0 accent-[#f06927]" {...ia('consent')} />
        <label htmlFor="lf-consent" className="text-sm text-paragraph">I agree that Zcorebit may contact me about this project by phone, WhatsApp or email. <a className="text-primary underline" href="https://www.zcorebit.com/contact-us" target="_blank" rel="noreferrer">Privacy Policy</a></label>
      </div>
      {errors.consent && <p role="alert" className="mt-1 text-xs text-destructive">{errors.consent}</p>}
      {state === 'error' && <p role="alert" className="mt-4 flex gap-2 rounded-lg bg-red-50 p-3 text-sm text-destructive"><AlertCircle size={18} className="mt-0.5 shrink-0" />{msg}</p>}
      <button type="submit" disabled={state === 'saving'} className="btn btn-primary mt-5 w-full disabled:opacity-70">
        {state === 'saving' ? <><Loader2 size={18} className="animate-spin" /> Saving your enquiry…</> : <>Get my store plan <ArrowRight size={17} /></>}
      </button>
      <p className="mt-3 text-center text-xs text-paragraph">Your enquiry is saved first, then WhatsApp opens. No payment required.</p>
    </form>
  );
}
const Chev = () => <span className="pointer-events-none absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-[#ffe6d6] text-primary"><ChevronDown size={16} /></span>;
