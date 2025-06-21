import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

const AuthPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in successfully!");
      navigate("/get-started"); // Redirect to the first protected page on success
    } catch (error) {
      toast.error("Failed to sign in with Google. Please try again.");
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-xl bg-white/80 backdrop-blur-sm p-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 pt-2">
            Sign in to continue to the Resume & LinkedIn Booster.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGoogleSignIn} className="w-full" size="lg">
            Sign In with Google
          </Button>
          <p className="text-xs text-gray-500 mt-4">
            By signing in, you agree to our terms of service.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage; 