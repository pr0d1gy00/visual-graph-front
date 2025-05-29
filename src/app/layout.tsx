import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "@/globalStyles/styles.css";
import "@/globalStyles/normalize.css";
import ClientLayout from "@/components/clientLayout/ClientLayout";
import Footer from "@/components/footer/footer";
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // Puedes elegir los pesos que necesites
});
export const metadata: Metadata = {
  title: "Visual Graph Graphic Designer",
  description: "Visual Graph Graphic Designer is a team of professional graphic designers offering creative design services for businesses and individuals. We specialize in logo design, visual identities, advertising materials, and custom graphic solutions to enhance your brand image. Explore our portfolio and elevate your project with creativity, innovation, and professional quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} body`}>
      <ClientLayout>
        {children}
      </ClientLayout>
      <Footer />

      </body>
    </html>
  );
}
