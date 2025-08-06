export const metadata = {
  title: 'toriba14 | About',
  description: 'toriba14 のホーム。プロフィール、ギャラリー、SNSリンク。',
};

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}