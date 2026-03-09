const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserOrOrgSite = repoName.endsWith('.github.io');
const basePath = isGithubPages && !isUserOrOrgSite && repoName ? `/${repoName}` : '';

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development' || isGithubPages,
});

const nextConfig = {
  reactStrictMode: true,
  output: isGithubPages ? 'export' : undefined,
  trailingSlash: isGithubPages,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};

module.exports = withPWA(nextConfig);
