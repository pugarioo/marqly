import "./globals.css";
import { Inter, Montserrat, Open_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: '--font-montserrat' });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: '--font-open-sans' });

export const metadata = {
  title: "Marqly - Marketing Management Platform",
  description: "Where Marketing Meets Quality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${montserrat.variable} ${openSans.variable}`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
