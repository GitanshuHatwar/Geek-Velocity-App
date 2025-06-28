import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, FileText, Video, Image, File, X } from "lucide-react";

interface UploadedDocument {
  id: number;
  type: "video" | "pdf" | "doc" | "image" | "other";
  title: string;
  details: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  classroomId: number;
}

const UploadDocument: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState<"video" | "pdf" | "doc" | "image" | "other" | "">("");
  const [unitModule, setUnitModule] = useState("");
  const [chapterTopic, setChapterTopic] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [details, setDetails] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadTypes = [
    { type: "video" as const, label: "Video", icon: Video, color: "#ef4444" },
    { type: "pdf" as const, label: "PDF Document", icon: FileText, color: "#dc2626" },
    { type: "doc" as const, label: "Word Document", icon: FileText, color: "#2563eb" },
    { type: "image" as const, label: "Image (PNG/JPEG)", icon: Image, color: "#059669" },
    { type: "other" as const, label: "Other", icon: File, color: "#7c3aed" }
  ];

  const generateTitle = () => {
    if (!unitModule || !chapterTopic || !documentNumber) return "";
    const typeLabel = uploadTypes.find(t => t.type === uploadType)?.label || "Document";
    return `${unitModule} - ${chapterTopic} - ${typeLabel} ${documentNumber}`;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadType || !unitModule || !chapterTopic || !documentNumber || !details) {
      alert("Please fill in all required fields and select a file.");
      return;
    }

    setIsUploading(true);

    try {
      // First, upload the file to the backend
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadResponse = await fetch('https://game-backend-mgd8.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('File upload failed');
      }

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create document record for local storage
      const newDocument: UploadedDocument = {
        id: Date.now(),
        type: uploadType as "video" | "pdf" | "doc" | "image" | "other",
        title: generateTitle(),
        details,
        fileName: selectedFile.name,
        fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString(),
        classroomId: Number(id)
      };

      // Save to localStorage
      const existingDocs = JSON.parse(localStorage.getItem("uploadedDocuments") || "[]");
      const updatedDocs = [...existingDocs, newDocument];
      localStorage.setItem("uploadedDocuments", JSON.stringify(updatedDocs));

      alert('File uploaded successfully!');
      navigate(`/classroom/${id}`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setUploadType("");
    setUnitModule("");
    setChapterTopic("");
    setDocumentNumber("");
    setDetails("");
    setSelectedFile(null);
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={() => navigate(`/classroom/${id}`)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1>Upload Document</h1>
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "1rem", marginBottom: "2rem" }}>
        <h2>Select Upload Type</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {uploadTypes.map((type) => (
            <button
              key={type.type}
              onClick={() => setUploadType(type.type)}
              style={{
                padding: "1.5rem",
                border: `2px solid ${uploadType === type.type ? type.color : "#e5e7eb"}`,
                borderRadius: "0.75rem",
                background: uploadType === type.type ? type.color : "white",
                color: uploadType === type.type ? "white" : "#6b7280",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem"
              }}
            >
              <type.icon size={24} />
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {uploadType && (
        <div style={{ background: "white", padding: "2rem", borderRadius: "1rem" }}>
          <h2>Document Details</h2>
          
          <div style={{ marginBottom: "2rem" }}>
            <h3>Title Template</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label>1. Unit/Module *</label>
                <input
                  type="text"
                  value={unitModule}
                  onChange={(e) => setUnitModule(e.target.value)}
                  placeholder="e.g., Unit 1, Module A"
                  style={{ width: "100%", padding: "0.75rem", border: "2px solid #e5e7eb", borderRadius: "0.5rem" }}
                />
              </div>
              <div>
                <label>2. Chapter/Topic Name *</label>
                <input
                  type="text"
                  value={chapterTopic}
                  onChange={(e) => setChapterTopic(e.target.value)}
                  placeholder="e.g., Introduction to Algebra"
                  style={{ width: "100%", padding: "0.75rem", border: "2px solid #e5e7eb", borderRadius: "0.5rem" }}
                />
              </div>
              <div>
                <label>3. Document Number *</label>
                <input
                  type="text"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  placeholder="e.g., 0, 1, 2"
                  style={{ width: "100%", padding: "0.75rem", border: "2px solid #e5e7eb", borderRadius: "0.5rem" }}
                />
              </div>
            </div>
            
            {generateTitle() && (
              <div>
                <label>Generated Title:</label>
                <div style={{ background: "#f3f4f6", padding: "1rem", borderRadius: "0.5rem", border: "2px solid #e5e7eb" }}>
                  <span>{generateTitle()}</span>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label>Document Details (2 lines) *</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide a brief description of the document content..."
              rows={2}
              style={{ width: "100%", padding: "0.75rem", border: "2px solid #e5e7eb", borderRadius: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3>Upload File</h3>
            <div style={{ border: "2px dashed #d1d5db", borderRadius: "0.75rem", padding: "2rem", textAlign: "center" }}>
              {selectedFile ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f9fafb", padding: "1rem", borderRadius: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <File size={20} />
                    <div>
                      <h4>{selectedFile.name}</h4>
                      <p>{(selectedFile.size / (1024 * 1024)).toFixed(1)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", cursor: "pointer" }}>
                  <Upload size={32} />
                  <span>Click to select file or drag and drop</span>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept={
                      uploadType === "video" ? "video/*" :
                      uploadType === "pdf" ? ".pdf" :
                      uploadType === "doc" ? ".doc,.docx" :
                      uploadType === "image" ? ".png,.jpg,.jpeg" :
                      "*"
                    }
                    style={{ display: "none" }}
                  />
                </label>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
            <button
              onClick={resetForm}
              disabled={isUploading}
              style={{ padding: "0.75rem 1.5rem", border: "2px solid #e5e7eb", background: "white", borderRadius: "0.5rem" }}
            >
              Reset Form
            </button>
            <button
              onClick={handleUpload}
              disabled={isUploading || !selectedFile || !unitModule || !chapterTopic || !documentNumber || !details}
              style={{ 
                padding: "0.75rem 1.5rem", 
                background: "#667eea", 
                color: "white", 
                border: "none", 
                borderRadius: "0.5rem",
                cursor: isUploading || !selectedFile || !unitModule || !chapterTopic || !documentNumber || !details ? "not-allowed" : "pointer",
                opacity: isUploading || !selectedFile || !unitModule || !chapterTopic || !documentNumber || !details ? 0.5 : 1
              }}
            >
              {isUploading ? "Uploading..." : "Upload Document"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocument;