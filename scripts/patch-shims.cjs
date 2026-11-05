const fs = require('fs');
const path = require('path');

const binDir = path.join(__dirname, '..', 'node_modules', '.bin');

if (fs.existsSync(binDir)) {
  const files = fs.readdirSync(binDir).filter((file) => file.endsWith('.cmd'));
  for (const file of files) {
    const fullPath = path.join(binDir, file);
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('SET dp0=%~dp0')) {
        fs.writeFileSync(fullPath, content.replace(/SET dp0=%~dp0/g, 'SET "dp0=%~dp0"'), 'utf8');
      }
    } catch {
      // ignore
    }
  }
}
