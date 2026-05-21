// Gawryletz Music — luxury editorial email template
// Warm-white paper, gold accent, Cormorant-style serif. Inlined styles for email clients.

export const BRAND = {
  name: 'Parker Gawryletz',
  shortName: 'Gawryletz Music',
  tagline: 'Pianist · Ceremony · Event · Mentorship',
  website: 'https://gawryletzmusic.com',
  email: 'parker@veepo.ca',
  colors: {
    paper: '#faf8f5',
    paperAlt: '#f3efe7',
    ink: '#141414',
    inkSoft: '#2d2a26',
    muted: '#6b665e',
    rule: '#d8d2c6',
    gold: '#c9a84c',
    goldDeep: '#a8852b',
  },
} as const;

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c)
  );
}

export function emailWrapper(content: string, preheader: string): string {
  const c = BRAND.colors;
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${BRAND.shortName}</title>
</head>
<body style="margin:0;padding:0;background:${c.paper};font-family:Georgia,'Times New Roman',serif;-webkit-font-smoothing:antialiased;color:${c.ink};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.paper};">
    <tr>
      <td align="center" style="padding:56px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${c.rule};">
          ${content}
        </table>
        <p style="margin:24px 0 0;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;color:${c.muted};text-transform:uppercase;">
          gawryletz&nbsp;·&nbsp;music
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function emailHeader(eyebrow: string, title: string): string {
  const c = BRAND.colors;
  return `
  <tr>
    <td style="padding:56px 56px 40px;text-align:center;background:#ffffff;">
      <p style="margin:0 0 28px;font-family:Georgia,serif;font-size:11px;letter-spacing:6px;color:${c.muted};text-transform:uppercase;">
        Gawryletz · Music
      </p>
      <div style="width:40px;height:1px;background:${c.gold};margin:0 auto 28px;"></div>
      <p style="margin:0 0 14px;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;color:${c.goldDeep};text-transform:uppercase;">
        ${escapeHtml(eyebrow)}
      </p>
      <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:34px;line-height:1.2;letter-spacing:-0.3px;color:${c.ink};font-style:italic;">
        ${escapeHtml(title)}
      </h1>
    </td>
  </tr>`;
}

export function detailRows(rows: Array<[string, string]>): string {
  const c = BRAND.colors;
  return rows
    .map(
      ([label, value], i) => `
      <tr>
        <td style="padding:18px 0 18px;border-top:${i === 0 ? `1px solid ${c.rule}` : '0'};border-bottom:1px solid ${c.rule};font-family:Georgia,serif;font-size:10px;letter-spacing:3px;color:${c.muted};text-transform:uppercase;width:120px;vertical-align:top;">
          ${escapeHtml(label)}
        </td>
        <td style="padding:18px 0 18px;border-top:${i === 0 ? `1px solid ${c.rule}` : '0'};border-bottom:1px solid ${c.rule};font-family:Georgia,serif;font-size:15px;color:${c.ink};line-height:1.6;">
          ${value}
        </td>
      </tr>`
    )
    .join('');
}

export function messageBlock(message: string): string {
  const c = BRAND.colors;
  return `
  <tr>
    <td style="padding:8px 56px 0;">
      <p style="margin:0 0 14px;font-family:Georgia,serif;font-size:10px;letter-spacing:3px;color:${c.muted};text-transform:uppercase;">
        The Message
      </p>
      <div style="position:relative;padding:24px 28px;background:${c.paper};border-left:2px solid ${c.gold};">
        <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.85;color:${c.inkSoft};font-style:italic;white-space:pre-wrap;">
          ${escapeHtml(message) || '<span style="color:#9c958a;">(no message provided)</span>'}
        </p>
      </div>
    </td>
  </tr>`;
}

export function ctaBlock(label: string, url: string, note?: string): string {
  const c = BRAND.colors;
  return `
  <tr>
    <td align="center" style="padding:48px 56px 8px;">
      <a href="${escapeHtml(url)}" style="display:inline-block;padding:16px 36px;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:${c.ink};background:#ffffff;border:1px solid ${c.ink};text-decoration:none;">
        ${escapeHtml(label)}
      </a>
      ${note ? `<p style="margin:16px 0 0;font-family:Georgia,serif;font-size:12px;color:${c.muted};font-style:italic;">${escapeHtml(note)}</p>` : ''}
    </td>
  </tr>`;
}

export function emailFooter(reason: string): string {
  const c = BRAND.colors;
  const year = new Date().getFullYear();
  return `
  <tr>
    <td style="padding:48px 56px 48px;text-align:center;background:#ffffff;border-top:1px solid ${c.rule};">
      <div style="width:24px;height:1px;background:${c.gold};margin:0 auto 24px;"></div>
      <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:14px;color:${c.ink};font-style:italic;">
        Parker Gawryletz
      </p>
      <p style="margin:0 0 22px;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;color:${c.muted};text-transform:uppercase;">
        Pianist
      </p>
      <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:12px;color:${c.muted};">
        <a href="${BRAND.website}" style="color:${c.muted};text-decoration:none;border-bottom:1px solid ${c.rule};">gawryletzmusic.com</a>
        &nbsp;·&nbsp;
        <a href="mailto:${BRAND.email}" style="color:${c.muted};text-decoration:none;border-bottom:1px solid ${c.rule};">${BRAND.email}</a>
      </p>
      <p style="margin:20px 0 0;font-family:Georgia,serif;font-size:10px;letter-spacing:1px;color:#a59f93;line-height:1.7;">
        ${escapeHtml(reason)}<br>
        © ${year} Gawryletz Music. All rights reserved.
      </p>
    </td>
  </tr>`;
}