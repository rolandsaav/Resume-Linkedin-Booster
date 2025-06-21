import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MainLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Signed out successfully.");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to sign out.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/get-started" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Career Alchemy
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <span className="text-sm text-gray-600 hidden sm:inline">
                  Welcome, {user.displayName || user.email}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 