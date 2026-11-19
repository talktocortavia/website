// Publishes the contents of dist/ (and nothing else) to the gh-pages branch.
import { execSync } from 'node:child_process';
import { mkdtempSync, cpSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

if (!existsSync('dist/index.html')) throw new Error('dist/ is missing. Run npm run build first.');
const remote = execSync('git remote get-url origin').toString().trim();
const tmp = mkdtempSync(join(tmpdir(), 'cortavia-deploy-'));
cpSync('dist', tmp, { recursive: true });
const run = (c) => execSync(c, { cwd: tmp, stdio: 'inherit' });
run('git init -q -b gh-pages');
run('git add -A');
run('git -c user.name="Cortavia deploy" -c user.email="contact@cortavia.in" commit -q -m "Deploy site"');
run(`git push --force "${remote}" gh-pages`);
console.log('Deployed dist/ to the gh-pages branch.');
