import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Link as LinkIcon } from "lucide-react";

const ResumeBuilderStep1 = () => {
  const [useUpload, setUseUpload] = useState(false);
  const [useLinkedIn, setUseLinkedIn] = useState(false);
  const [useManual, setUseManual] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const navigate = useNavigate();

  const canContinue = useUpload || useLinkedIn || useManual;

  const handleContinue = () => {
    // For now, if manual is selected, we go to the manual form.
    // This can be expanded later to handle other flows.
    if (useManual) {
      navigate("/resume-builder/manual-form");
    } else {
      // Placeholder for other flows
      console.log({
        useUpload,
        useLinkedIn,
        linkedInUrl,
      });
      alert("Flow for Upload or LinkedIn not implemented yet.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Let's Build Your New Resume
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 pt-2">
            How would you like to provide your information? Choose one or more options.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div
            className={`p-6 rounded-lg border-2 transition-all ${
              useUpload ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start space-x-4">
              <Checkbox id="upload" checked={useUpload} onCheckedChange={() => setUseUpload(!useUpload)} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="upload" className="text-xl font-semibold text-gray-800 cursor-pointer">
                  Upload an existing resume
                </Label>
                <p className="text-gray-500">
                  We'll parse your PDF or DOCX file to get you started.
                </p>
                {useUpload && (
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Choose File (Not implemented)
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-lg border-2 transition-all ${
              useLinkedIn ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start space-x-4">
              <Checkbox id="linkedin" checked={useLinkedIn} onCheckedChange={() => setUseLinkedIn(!useLinkedIn)} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="linkedin" className="text-xl font-semibold text-gray-800 cursor-pointer">
                  Paste a LinkedIn profile URL
                </Label>
                <p className="text-gray-500">
                  Import your information directly from your LinkedIn profile.
                </p>
                {useLinkedIn && (
                  <div className="mt-4 relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="url"
                      placeholder="https://www.linkedin.com/in/your-profile"
                      value={linkedInUrl}
                      onChange={(e) => setLinkedInUrl(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-lg border-2 transition-all ${
              useManual ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start space-x-4">
              <Checkbox id="manual" checked={useManual} onCheckedChange={() => setUseManual(!useManual)} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="manual" className="text-xl font-semibold text-gray-800 cursor-pointer">
                  Fill out information manually
                </Label>
                <p className="text-gray-500">
                  Start from a blank slate and we'll guide you through.
                </p>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full mt-8 py-6 text-lg"
            disabled={!canContinue}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeBuilderStep1; 