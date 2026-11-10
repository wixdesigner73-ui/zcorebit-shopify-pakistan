import { createClient } from '@supabase/supabase-js';
import { config } from './config';

export interface Enquiry {
  full_name: string; whatsapp: string; email: string; business_name: string;
  offer: string; package_interest: string; description: string;
  design_reference: string; consent: boolean;
}
export class NotConfiguredError extends Error {}

/** Persist the enquiry. Throws if it was NOT saved: callers must never claim success otherwise. */
export async function saveEnquiry(e: Enquiry): Promise<void> {
  if (!config.supabaseUrl || !config.supabaseAnonKey) throw new NotConfiguredError('Enquiry storage is not configured yet.');
  const sb = createClient(config.supabaseUrl, config.supabaseAnonKey, { auth: { persistSession: false } });
  const { error } = await sb.from('enquiries').insert({ ...e, source: 'shopify-development-pakistan', user_agent: navigator.userAgent.slice(0, 250) });
  if (error) throw new Error(error.message);
}

export function whatsappUrl(e: Enquiry): string | null {
  if (!config.whatsappNumber) return null;
  const text = [
    "Hi Zcorebit, I'd like a store plan.", `Name: ${e.full_name}`, `Business: ${e.business_name} (${e.offer})`,
    `Package: ${e.package_interest}`, e.design_reference && `Design reference: ${e.design_reference}`, `Details: ${e.description}`,
  ].filter(Boolean).join('\n');
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
