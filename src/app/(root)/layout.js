import "../globals.css";
import Header from "../../components/root/Header";
import Footer from "../../components/root/Footer";
function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black scroll-smooth pt-4">
      <body className="flex flex-col min-h-screen w-screen justify-between">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
