// All runtime configuration comes from Vite env vars (see .env.example).
// Only PUBLIC values belong here: the Supabase anon key is safe in the browser
// because Row Level Security restricts it to INSERT on the enquiries table.
export const config = {
  supabaseUrl: (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? '',
  supabaseAnonKey: (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? '',
  whatsappNumber: ((import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? '923006423452').replace(/\D/g, ''),
  base: import.meta.env.BASE_URL,
};
export const asset = (p: string) => `${config.base}${p.replace(/^\//, '')}`;
