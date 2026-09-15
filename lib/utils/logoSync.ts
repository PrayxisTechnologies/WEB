import fs from 'fs';
import path from 'path';

export function syncOfficialLogo() {
  try {
    const downloadPath = 'C:\\Users\\Prashant Singh\\Downloads\\LOGO OFFICIAL.png';
    const publicDir = path.join(process.cwd(), 'public');
    const assetsDir = path.join(publicDir, 'assets');

    if (fs.existsSync(downloadPath)) {
      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }
      fs.copyFileSync(downloadPath, path.join(assetsDir, 'prayxis_logo.png'));
      fs.copyFileSync(downloadPath, path.join(assetsDir, 'prayxis_logo.jpg'));
      fs.copyFileSync(downloadPath, path.join(assetsDir, 'LOGO OFFICIAL.png'));
      fs.copyFileSync(downloadPath, path.join(publicDir, 'logo.png'));
      fs.copyFileSync(downloadPath, path.join(publicDir, 'favicon.png'));
      fs.copyFileSync(downloadPath, path.join(publicDir, 'favicon.ico'));
    }
  } catch (err) {
    // Silent fail if permissions or path missing
  }
}

// Auto sync on import
syncOfficialLogo();
