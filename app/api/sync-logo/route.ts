import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const downloadPath = 'C:\\Users\\Prashant Singh\\Downloads\\LOGO OFFICIAL.png';
    const publicDir = path.join(process.cwd(), 'public');
    const assetsDir = path.join(publicDir, 'assets');

    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    if (fs.existsSync(downloadPath)) {
      const buf = fs.readFileSync(downloadPath);
      fs.writeFileSync(path.join(assetsDir, 'prayxis_logo.png'), buf);
      fs.writeFileSync(path.join(assetsDir, 'prayxis_logo.jpg'), buf);
      fs.writeFileSync(path.join(assetsDir, 'LOGO OFFICIAL.png'), buf);
      fs.writeFileSync(path.join(publicDir, 'logo.png'), buf);
      fs.writeFileSync(path.join(publicDir, 'favicon.png'), buf);
      fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buf);

      return NextResponse.json({
        success: true,
        message: 'Official logo synced successfully to public assets & root favicon!',
        sizeBytes: buf.length,
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Source file not found at ' + downloadPath },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
