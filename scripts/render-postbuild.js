const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'client', 'build');
const targetDir = path.join(rootDir, 'build');

if (!fs.existsSync(sourceDir)) {
  console.error(`Missing build output at ${sourceDir}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
for (const entry of entries) {
  const from = path.join(sourceDir, entry.name);
  const to = path.join(targetDir, entry.name);
  fs.cpSync(from, to, { recursive: true, force: true });
}
