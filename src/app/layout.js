

import "./globals.css"
export const metadata = {
  title: 'Admin Dashboard',
  description: 'Employee Management System Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
