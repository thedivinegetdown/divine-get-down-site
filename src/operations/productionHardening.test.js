import fs from 'fs';
import path from 'path';

const projectRoot = path.join(__dirname, '..', '..');

test('keeps hashed assets immutable after the catch-all header policy', () => {
  const netlifyConfig = fs.readFileSync(path.join(projectRoot, 'netlify.toml'), 'utf8');
  const catchAllIndex = netlifyConfig.indexOf('for = "/*"');
  const staticIndex = netlifyConfig.indexOf('for = "/static/*"');

  expect(catchAllIndex).toBeGreaterThan(-1);
  expect(staticIndex).toBeGreaterThan(catchAllIndex);
  expect(netlifyConfig.slice(staticIndex)).toContain(
    'Cache-Control = "public, max-age=31536000, immutable"',
  );
});

test('does not publish source maps without a private monitoring workflow', () => {
  const productionEnvironment = fs.readFileSync(
    path.join(projectRoot, '.env.production'),
    'utf8',
  );

  expect(productionEnvironment).toContain('GENERATE_SOURCEMAP=false');
});

test('validates pull requests and production-branch pushes with least privilege', () => {
  const workflow = fs.readFileSync(
    path.join(projectRoot, '.github', 'workflows', 'ci.yml'),
    'utf8',
  );

  expect(workflow).toContain('pull_request:');
  expect(workflow).toContain('branches:');
  expect(workflow).toContain('- main');
  expect(workflow).toContain('contents: read');
  expect(workflow).toContain('run: npm ci');
  expect(workflow).toContain('run: npm run lint');
  expect(workflow).toContain('run: npm test -- --watchAll=false');
  expect(workflow).toContain('run: npm run build');
  expect(workflow).not.toMatch(/contents:\s*write/);
});
