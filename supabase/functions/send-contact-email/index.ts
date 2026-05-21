import {
  BRAND,
  emailWrapper,
  emailHeader,
  detailRows,
  messageBlock,
  ctaBlock,
  emailFooter,
  escapeHtml,
} from '../_shared/email-template.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend';
const TO_EMAIL = 'parker@veepo.ca';

interface Payload {
  name: string;
  email: string;
  message?: string;
  vertical?: 'weddings' | 'events' | 'teaching' | string;
}

const verticalLabel: Record<string, { eyebrow: string; title: string }> = {
  weddings: { eyebrow: 'A New Ceremony Inquiry', title: 'A wedding has arrived.' },
  events: { eyebrow: 'A New Event Inquiry', title: 'A new room awaits.' },
  teaching: { eyebrow: 'A New Mentorship Inquiry', title: 'A new student approaches.' },
  general: { eyebrow: 'A New Inquiry', title: 'A new message has arrived.' },
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');

    const body = (await req.json()) as Payload;
    const name = (body.name || '').toString().trim().slice(0, 200);
    const email = (body.email || '').toString().trim().slice(0, 320);
    const message = (body.message || '').toString().trim().slice(0, 5000);
    const vertical = (body.vertical || 'general').toString().slice(0, 40);

    if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const subject = `New ${vertical} inquiry — ${name}`;
    const meta = verticalLabel[vertical] || verticalLabel.general;
    const timestamp = new Date().toLocaleString('en-CA', {
      timeZone: 'America/Edmonton',
      dateStyle: 'long',
      timeStyle: 'short',
    });

    const content =
      emailHeader(meta.eyebrow, meta.title) +
      `<tr><td style="padding:8px 56px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${detailRows([
            ['Name', escapeHtml(name)],
            ['Email', `<a href="mailto:${escapeHtml(email)}" style="color:${BRAND.colors.ink};text-decoration:none;border-bottom:1px solid ${BRAND.colors.gold};">${escapeHtml(email)}</a>`],
            ['Vertical', escapeHtml(vertical)],
            ['Received', escapeHtml(timestamp) + ' <span style="color:#9c958a;">MT</span>'],
          ])}
        </table>
      </td></tr>` +
      messageBlock(message) +
      ctaBlock(`Reply to ${name.split(' ')[0] || 'sender'}`, `mailto:${email}`, 'Replying sends a message directly to the visitor.') +
      emailFooter('You received this because a visitor submitted the contact form on gawryletzmusic.com.');

    const html = emailWrapper(content, `New ${vertical} inquiry from ${name}`);

    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: 'Parker Gawryletz <noreply@gawryletzmusic.com>',
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Resend error', res.status, data);
      return new Response(JSON.stringify({ error: 'Send failed', details: data }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('send-contact-email error:', msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});