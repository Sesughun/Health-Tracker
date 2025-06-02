import './globals.css';

export const metadata = {
  title: 'CU Health Tracker',
  description: 'Health tracking app for Covenant University students',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
