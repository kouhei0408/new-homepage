/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // SSG: 静的エクスポート
    images: { unoptimized: true }, // 画像最適化なし（静的ホスティング向け）
};
module.exports = nextConfig;