"use client";
import MobileNav from "@/components/common/MobileNav";
import Sidebar from "@/components/common/Sidebar";
import { SocketContextProvider } from "@/context/SocketContext";

// import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContextProvider>
      <main className="root">
        <Sidebar />
        <MobileNav />

        <div className="root-container">
          <div className="wrapper">{children}</div>
        </div>

        {/* <Toaster /> */}
      </main>
    </SocketContextProvider>
  );
};

export default Layout;
