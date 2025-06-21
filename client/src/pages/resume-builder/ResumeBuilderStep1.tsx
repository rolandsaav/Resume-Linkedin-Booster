import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/context/SessionContext";

const ResumeBuilderStep1 = () => {
  const { sessionId } = useSession();
  const [useUpload, setUseUpload] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [useLinkedIn, setUseLinkedIn] = useState(false);
  const [useManual, setUseManual] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [isLinkedInTouched, setIsLinkedInTouched] = useState(false);
  const navigate = useNavigate();

  const linkedInRegex = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
  const isLinkedInValid = linkedInUrl.trim() === "" || linkedInRegex.test(linkedInUrl.trim());

  const isUploadSelectedAndReady = useUpload && resumeFile !== null;
  const isLinkedInSelectedAndReady = useLinkedIn && linkedInUrl.trim() !== "" && isLinkedInValid;
  const canContinue = isUploadSelectedAndReady || isLinkedInSelectedAndReady || useManual;
  const showLinkedInError = useLinkedIn && isLinkedInTouched && !isLinkedInValid;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setResumeFile(event.target.files[0]);
    } else {
      setResumeFile(null);
    }
  };

  const handleContinue = () => {
    // Fire off submissions in the background without waiting for them.
    if (isUploadSelectedAndReady) {
      const formData = new FormData();
      formData.append("session_id", sessionId);
      if (resumeFile) formData.append("resume", resumeFile);
      fetch("http://localhost:8000/save/resume", { method: "POST", body: formData })
        .then(res => {
          if(!res.ok) toast.error("Failed to submit resume file.");
        })
        .catch(() => toast.error("An error occurred submitting the resume file."));
    }

    if (isLinkedInSelectedAndReady) {
      const formData = new FormData();
      formData.append("session_id", sessionId);
      formData.append("linkedin_url", linkedInUrl);
      fetch("http://localhost:8000/save/linkedin", { method: "POST", body: formData })
        .then(res => {
          if(!res.ok) toast.error("Failed to submit LinkedIn URL.");
        })
        .catch(() => toast.error("An error occurred submitting the LinkedIn URL."));
    }

    // Navigate immediately based on user's choice.
    if (useManual) {
      navigate("/resume-builder/manual-form");
    } else {
      navigate("/resume-builder/in-progress");
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
                  We'll parse your PDF file to get you started.
                </p>
                {useUpload && (
                  <div className="mt-4">
                    <Input id="resume-file" type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
                    <Label htmlFor="resume-file" className="cursor-pointer">
                      <Button variant="outline" className="w-full" asChild>
                        <div>
                          <Upload className="mr-2 h-4 w-4" />
                          {resumeFile ? resumeFile.name : "Choose File"}
                        </div>
                      </Button>
                    </Label>
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
                      onBlur={() => setIsLinkedInTouched(true)}
                      className={`pl-10 ${showLinkedInError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    />
                    {showLinkedInError && (
                      <p className="text-red-600 text-sm mt-2">Please enter a valid LinkedIn profile URL.</p>
                    )}
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