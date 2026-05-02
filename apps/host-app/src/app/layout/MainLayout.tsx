import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }: any) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <div className="flex-1 overflow-auto p-4 lg:p-6 pt-16 lg:pt-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
