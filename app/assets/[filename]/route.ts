import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    
    // First check local project public/assets directory (Production & Vercel)
    const publicFilePath = path.join(process.cwd(), 'public', 'assets', filename);
    let filePath = '';

    if (fs.existsSync(publicFilePath)) {
      filePath = publicFilePath;
    } else {
      // Fallback to local Windows directory
      const assetDir = 'C:\\Users\\Prashant Singh\\Documents\\landing page\\assets';
      const extPath = path.join(assetDir, filename);
      if (fs.existsSync(extPath)) {
        filePath = extPath;
      }
    }

    if (!filePath || !fs.existsSync(filePath)) {
      return new NextResponse('Asset not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filename).toLowerCase();

    let contentType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.gif') contentType = 'image/gif';

    // Also persist copy to public/assets if possible
    try {
      const publicAssetsDir = path.join(process.cwd(), 'public', 'assets');
      if (!fs.existsSync(publicAssetsDir)) {
        fs.mkdirSync(publicAssetsDir, { recursive: true });
      }
      const publicDest = path.join(publicAssetsDir, filename);
      if (!fs.existsSync(publicDest)) {
        fs.writeFileSync(publicDest, fileBuffer);
      }
    } catch (e) {}

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err: any) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
