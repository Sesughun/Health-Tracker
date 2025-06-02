export const metadata = {
  title: 'CU Health Tracker',
  description: 'Health tracking app for Covenant University students',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          @tailwind base;
          @tailwind components;
          @tailwind utilities;
        `}</style>
      </head>
      <body
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          backgroundColor: '#ffffff'
        }}
      >
        {children}
      </body>
    </html>
  );
}
