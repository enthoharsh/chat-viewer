// app/sitemap.xml/route.ts

export async function GET() {
    const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://whatsappchatviewer.vercel.app/</loc>
        <lastmod>2025-04-11</lastmod>
        <priority>1.00</priority>
      </url>
    </urlset>`;
    
    return new Response(body, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
  