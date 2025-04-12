import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/root/Footer";

function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black scroll-smooth">
      <body className="pt-5 flex flex-col min-h-screen justify-between">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
