import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hourglass } from "lucide-react";

const ResumeInProgress = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center shadow-xl bg-white/80 backdrop-blur-sm p-8">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Hourglass className="h-12 w-12 text-blue-500 animate-spin" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Your Resume is Being Processed
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 pt-2">
            We're working our magic on the information you provided.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            This may take a few moments. We will have the final result ready for you shortly on the results page.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            (For now, this is a placeholder. In the future, this page will poll for results and automatically redirect you.)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeInProgress; 