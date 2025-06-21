import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { v4 as uuidv4 } from 'uuid';

// Sub-components for repeatable sections would be ideal, but for now, all in one file.

const Section = ({ title, description, children }) => (
  <div className="py-8">
    <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    <p className="text-gray-500 mb-6">{description}</p>
    {children}
  </div>
);

const ManualEntryForm = () => {
  const [formData, setFormData] = useState({
    contact: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedinUrl: "",
      websiteUrl: "",
    },
    summary: "",
    experience: [{ id: uuidv4(), jobTitle: "", companyName: "", location: "", startDate: "", endDate: "", description: "" }],
    projects: [{ id: uuidv4(), projectName: "", tools: "", description: "" }],
    education: [{ id: uuidv4(), schoolName: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", honors: "" }],
    skills: [],
  });
  const [skillInput, setSkillInput] = useState("");

  const handleContactChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, contact: { ...prev.contact, [id]: value } }));
  };

  const handleDynamicChange = (section, id, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) => (item.id === id ? { ...item, [name]: value } : item)),
    }));
  };

  const addDynamicItem = (section) => {
    let newItem;
    if (section === 'experience') {
      newItem = { id: uuidv4(), jobTitle: "", companyName: "", location: "", startDate: "", endDate: "", description: "" };
    } else if (section === 'projects') {
      newItem = { id: uuidv4(), projectName: "", tools: "", description: "" };
    } else { // education
      newItem = { id: uuidv4(), schoolName: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", honors: "" };
    }
    setFormData((prev) => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  const removeDynamicItem = (section, id) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };
  
  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !formData.skills.includes(newSkill)) {
        setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(skill => skill !== skillToRemove) }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    // Proceed to next step
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <Card className="max-w-4xl mx-auto shadow-none sm:shadow-lg border-0 sm:border">
        <CardHeader className="text-center p-8">
          <CardTitle className="text-4xl font-bold text-gray-900">Create Your Resume</CardTitle>
          <CardDescription className="text-lg text-gray-600 pt-2">
            Fill in your details below. You can add multiple entries for experience, projects, and education.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">

          {/* Contact Information */}
          <Section title="Contact Information" description="Let recruiters know how to reach you.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div><Label htmlFor="fullName">Full Name</Label><Input id="fullName" value={formData.contact.fullName} onChange={handleContactChange} /></div>
              <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={formData.contact.email} onChange={handleContactChange} /></div>
              <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" type="tel" value={formData.contact.phone} onChange={handleContactChange} /></div>
              <div><Label htmlFor="location">Location (City, State)</Label><Input id="location" value={formData.contact.location} onChange={handleContactChange} /></div>
              <div><Label htmlFor="linkedinUrl">LinkedIn URL</Label><Input id="linkedinUrl" type="url" value={formData.contact.linkedinUrl} onChange={handleContactChange} /></div>
              <div><Label htmlFor="websiteUrl">Portfolio/Website</Label><Input id="websiteUrl" type="url" value={formData.contact.websiteUrl} onChange={handleContactChange} /></div>
            </div>
          </Section>

          {/* Professional Summary */}
          <Section title="Professional Summary" description="A brief, 2-3 sentence overview of your career.">
            <Textarea placeholder="E.g., Results-driven software engineer with 5+ years of experience..." value={formData.summary} onChange={(e) => setFormData(prev => ({...prev, summary: e.target.value}))}/>
          </Section>
          
          {/* Work Experience */}
          <Section title="Work Experience" description="Detail your professional roles, starting with the most recent.">
            {formData.experience.map((exp, index) => (
              <div key={exp.id} className="p-6 border rounded-lg mb-6 relative">
                {formData.experience.length > 1 && <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeDynamicItem('experience', exp.id)}><Trash2 className="h-4 w-4" /></Button>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>Job Title</Label><Input name="jobTitle" value={exp.jobTitle} onChange={(e) => handleDynamicChange('experience', exp.id, e)} /></div>
                  <div><Label>Company Name</Label><Input name="companyName" value={exp.companyName} onChange={(e) => handleDynamicChange('experience', exp.id, e)} /></div>
                  <div><Label>Location</Label><Input name="location" value={exp.location} onChange={(e) => handleDynamicChange('experience', exp.id, e)} /></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label>Start Date</Label><Input name="startDate" placeholder="MM/YYYY" value={exp.startDate} onChange={(e) => handleDynamicChange('experience', exp.id, e)} /></div>
                    <div><Label>End Date</Label><Input name="endDate" placeholder="MM/YYYY or Present" value={exp.endDate} onChange={(e) => handleDynamicChange('experience', exp.id, e)} /></div>
                  </div>
                  <div className="sm:col-span-2"><Label>Description</Label><Textarea name="description" placeholder="Describe your responsibilities and achievements..." value={exp.description} onChange={(e) => handleDynamicChange('experience', exp.id, e)} /></div>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={() => addDynamicItem('experience')}><PlusCircle className="mr-2 h-4 w-4" /> Add Role</Button>
          </Section>

          {/* Projects */}
          <Section title="Projects" description="Showcase your personal or professional projects.">
            {formData.projects.map((proj, index) => (
               <div key={proj.id} className="p-6 border rounded-lg mb-6 relative">
                {formData.projects.length > 1 && <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeDynamicItem('projects', proj.id)}><Trash2 className="h-4 w-4" /></Button>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><Label>Project Name</Label><Input name="projectName" value={proj.projectName} onChange={(e) => handleDynamicChange('projects', proj.id, e)} /></div>
                    <div><Label>Tools/Technologies Used</Label><Input name="tools" value={proj.tools} onChange={(e) => handleDynamicChange('projects', proj.id, e)} /></div>
                    <div className="sm:col-span-2"><Label>Description</Label><Textarea name="description" value={proj.description} onChange={(e) => handleDynamicChange('projects', proj.id, e)} /></div>
                </div>
               </div>
            ))}
            <Button variant="outline" onClick={() => addDynamicItem('projects')}><PlusCircle className="mr-2 h-4 w-4" /> Add Project</Button>
          </Section>

          {/* Education */}
          <Section title="Education" description="List your academic qualifications.">
             {formData.education.map((edu, index) => (
                 <div key={edu.id} className="p-6 border rounded-lg mb-6 relative">
                    {formData.education.length > 1 && <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeDynamicItem('education', edu.id)}><Trash2 className="h-4 w-4" /></Button>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><Label>School Name</Label><Input name="schoolName" value={edu.schoolName} onChange={(e) => handleDynamicChange('education', edu.id, e)} /></div>
                        <div><Label>Degree</Label><Input name="degree" value={edu.degree} onChange={(e) => handleDynamicChange('education', edu.id, e)} /></div>
                        <div className="sm:col-span-2"><Label>Field of Study</Label><Input name="fieldOfStudy" value={edu.fieldOfStudy} onChange={(e) => handleDynamicChange('education', edu.id, e)} /></div>
                        <div className="grid grid-cols-2 gap-2">
                            <div><Label>Start Date</Label><Input name="startDate" placeholder="MM/YYYY" value={edu.startDate} onChange={(e) => handleDynamicChange('education', edu.id, e)} /></div>
                            <div><Label>End Date</Label><Input name="endDate" placeholder="MM/YYYY or Present" value={edu.endDate} onChange={(e) => handleDynamicChange('education', edu.id, e)} /></div>
                        </div>
                        <div className="sm:col-span-2"><Label>Honors or Awards (optional)</Label><Input name="honors" value={edu.honors} onChange={(e) => handleDynamicChange('education', edu.id, e)} /></div>
                    </div>
                 </div>
             ))}
            <Button variant="outline" onClick={() => addDynamicItem('education')}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
          </Section>

          {/* Skills */}
          <Section title="Skills" description="Enter your skills and press Enter or comma to add them.">
            <div className="p-2 border rounded-lg flex flex-wrap gap-2 mb-4">
                {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-base">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="ml-2 rounded-full hover:bg-gray-300 p-0.5"><X className="h-3 w-3" /></button>
                    </Badge>
                ))}
                <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="Type a skill and press Enter..."
                    className="flex-1 border-none shadow-none focus-visible:ring-0"
                />
            </div>
          </Section>

          <div className="text-center pt-8">
            <Button size="lg" className="px-12 py-6 text-xl" onClick={handleSubmit}>Continue</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManualEntryForm; 