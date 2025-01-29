import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/shared/Footer";
import React from "react";

const Layout = ({ children }: ChildrenProps) => {
  return (
    <main className="w-full min-h-screen items-center justify-center bg-secondary-100">
      <Navbar />
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex w-full h-full min-h-screen max-w-md items-center justify-center">
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
