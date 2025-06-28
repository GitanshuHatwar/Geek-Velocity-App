import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Upload, Users, BookOpen, FileText, Settings, Bell, Lock, Globe, Calendar,
  Clock, MapPin, Tag, Plus, Minus, ChevronDown, ChevronUp, Save, Shield, UserPlus,
  GraduationCap, Palette, Video, Image, Play, Edit, Trash2, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setClassrooms, getClassrooms } from './mockData';

// --- TYPE DEFINITIONS ---
interface MissionContent {
  id: string;
  type: 'video' | 'pdf' | 'lecture' | 'image';
  title: string;
  description: string;
  file?: File;
  url?: string;
  duration?: string;
  order: number;
}

interface Mission {
  id:string;
  title: string;
  description: string;
  content: MissionContent[];
  settings: {
    isActive: boolean;
    allowRetakes: boolean;
    timeLimit: number;
    passingScore: number;
    showAnswers: boolean;
    allowDiscussion: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

// --- CONSTANTS (moved outside component for performance) ---
const backgroundOptions = [
  { id: 0, name: 'Ocean Blue', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 1, name: 'Sunset Orange', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 2, name: 'Forest Green', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 3, name: 'Purple Dreams', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { id: 4, name: 'Warm Coral', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
  { id: 5, name: 'Sky Blue', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
  { id: 6, name: 'Golden Hour', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: 7, name: 'Mint Fresh', gradient: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)' },
];

const subjects = [
  'Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 
  'Chemistry', 'Biology', 'Computer Science', 'Art', 'Music', 'Physical Education'
];

const gradeLevels = [
  'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
  'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'University'
];

const initialMissionSettings = {
  isActive: true,
  allowRetakes: true,
  timeLimit: 0,
  passingScore: 70,
  showAnswers: false,
  allowDiscussion: true
};

// --- MAIN COMPONENT ---
const CreateClass: React.FC = () => {
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  // Basic Class Info
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [studentCount, setStudentCount] = useState(25);
  const [description, setDescription] = useState('');
  const [selectedBackground, setSelectedBackground] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Mission State
  const [missions, setMissions] = useState<Mission[]>([]);
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [showMissionForm, setShowMissionForm] = useState(false);
  const [missionTitle, setMissionTitle] = useState('');
  const [missionDescription, setMissionDescription] = useState('');
  const [missionContent, setMissionContent] = useState<MissionContent[]>([]);
  const [missionSettings, setMissionSettings] = useState(initialMissionSettings);
  
  // Advanced Options State
  const [notifications, setNotifications] = useState(true);
  const [classType, setClassType] = useState('public');
  const [allowStudentInvites, setAllowStudentInvites] = useState(false);
  const [autoAcceptStudents, setAutoAcceptStudents] = useState(true);
  const [classSchedule, setClassSchedule] = useState('');
  const [classLocation, setClassLocation] = useState('');
  const [classTags, setClassTags] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [academicYear, setAcademicYear] = useState('2024-2025');

  // --- HANDLERS ---
  const handleStudentCountChange = (increment: boolean) => {
    setStudentCount(prev => {
      if (increment) return Math.min(prev + 1, 100);
      return Math.max(prev - 1, 1);
    });
  };

  // Mission Management
  const handleCreateMission = () => {
    setCurrentMission(null);
    setMissionTitle('');
    setMissionDescription('');
    setMissionContent([]);
    setMissionSettings(initialMissionSettings);
    setShowMissionForm(true);
  };

  const handleEditMission = (mission: Mission) => {
    setCurrentMission(mission);
    setMissionTitle(mission.title);
    setMissionDescription(mission.description);
    setMissionContent([...mission.content]);
    setMissionSettings({ ...mission.settings });
    setShowMissionForm(true);
  };

  const handleDeleteMission = (missionId: string) => {
    setMissions(prev => prev.filter(m => m.id !== missionId));
  };

  const handleSaveMission = () => {
    if (!missionTitle.trim()) return;

    const missionData: Mission = {
      id: currentMission?.id || Date.now().toString(),
      title: missionTitle,
      description: missionDescription,
      content: missionContent.sort((a, b) => a.order - b.order),
      settings: missionSettings,
      createdAt: currentMission?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (currentMission) {
      setMissions(prev => prev.map(m => m.id === currentMission.id ? missionData : m));
    } else {
      setMissions(prev => [...prev, missionData]);
    }

    setShowMissionForm(false);
    setCurrentMission(null);
  };

  // Mission Content Management
  const handleAddContent = (type: MissionContent['type']) => {
    const newContent: MissionContent = {
      id: Date.now().toString(),
      type,
      title: '',
      description: '',
      order: missionContent.length + 1
    };
    setMissionContent(prev => [...prev, newContent]);
  };

  const handleUpdateContent = (id: string, updates: Partial<MissionContent>) => {
    setMissionContent(prev => prev.map(content => 
      content.id === id ? { ...content, ...updates } : content
    ));
  };

  const handleRemoveContent = (id: string) => {
    setMissionContent(prev => prev.filter(content => content.id !== id));
  };

  const handleFileUpload = (contentId: string, file: File) => {
    handleUpdateContent(contentId, { file, title: file.name });
  };

  const handleReorderContent = (id: string, direction: 'up' | 'down') => {
    setMissionContent(prev => {
      const index = prev.findIndex(c => c.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.length - 1) return prev;
  
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      const newArray = [...prev];
      const [movedItem] = newArray.splice(index, 1);
      newArray.splice(newIndex, 0, movedItem);
      
      return newArray.map((item, idx) => ({ ...item, order: idx + 1 }));
    });
  };

  // Class Creation
  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!className.trim() || !subject.trim()) {
      alert("Please fill in the required fields: Class Name and Subject.");
      return;
    }
    
    const classrooms = getClassrooms();
    const newClassroom = {
      id: Date.now(),
      title: className,
      subject,
      description,
      backgroundId: selectedBackground,
      backgroundGradient: backgroundOptions[selectedBackground].gradient,
      backgroundName: backgroundOptions[selectedBackground].name,
      studentCount,
      classType,
      gradeLevel,
      academicYear,
      classSchedule,
      classLocation,
      classTags,
      missions: missions
    };
    setClassrooms([...classrooms, newClassroom]);
    
    // In a real app, you'd show a success toast notification here.
    console.log("Class created successfully!", newClassroom);
    
    navigate('/dashboard');
  };

  // --- MEMOIZED VALUES ---
  const sortedMissionContent = useMemo(() => 
    [...missionContent].sort((a, b) => a.order - b.order), 
    [missionContent]
  );

  return (
    <>
      <div className="create-class-container">
        <header className="page-header">
          <button
            className="back-button"
            onClick={() => navigate('/dashboard')}
            aria-label="Back to Dashboard"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="page-title">Create New Class</h1>
        </header>

        <main className="content-layout">
          {/* --- LEFT COLUMN: FORM --- */}
          <div className="form-column">
            <form onSubmit={handleCreateClass} noValidate>
              {/* Basic Information */}
              <div className="form-section">
                <h2 className="section-title">Basic Information</h2>
                <div className="form-group">
                  <label className="form-label" htmlFor="className"><BookOpen size={16} />Class Name *</label>
                  <input id="className" type="text" className="form-input" placeholder="e.g., Advanced Algebra" value={className} onChange={(e) => setClassName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="subject"><GraduationCap size={16} />Subject *</label>
                  <select id="subject" className="form-select" value={subject} onChange={(e) => setSubject(e.target.value)} required>
                    <option value="" disabled>Select a subject</option>
                    {subjects.map((subj) => <option key={subj} value={subj}>{subj}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label"><Users size={16} />Number of Students</label>
                  <div className="number-picker">
                    <button type="button" className="number-btn" onClick={() => handleStudentCountChange(false)} aria-label="Decrease student count"><Minus size={16} /></button>
                    <span className="number-display">{studentCount}</span>
                    <button type="button" className="number-btn" onClick={() => handleStudentCountChange(true)} aria-label="Increase student count"><Plus size={16} /></button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="description"><FileText size={16} />Description</label>
                  <textarea id="description" className="form-textarea" placeholder="Briefly describe your class, its goals, and target audience." rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>

              {/* Background Selection */}
              <div className="form-section">
                <h2 className="section-title"><Palette size={20} />Choose Class Background</h2>
                <div className="background-grid">
                  {backgroundOptions.map((bg) => (
                    <div key={bg.id} className={`background-option ${selectedBackground === bg.id ? 'selected' : ''}`} style={{ background: bg.gradient }} onClick={() => setSelectedBackground(bg.id)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelectedBackground(bg.id)}>
                      <div className="background-name">{bg.name}</div>
                      {selectedBackground === bg.id && <div className="selected-indicator">✓</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Advanced Options */}
              <div className="form-section">
                <button type="button" className="advanced-toggle" onClick={() => setShowAdvanced(!showAdvanced)} aria-expanded={showAdvanced}>
                  <Settings size={16} /> Advanced Options {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {showAdvanced && (
                  <div className="advanced-options">
                    <div className="form-group">
                      <label className="form-label">Class Visibility</label>
                      <div className="radio-group">
                        {/* Radio options for Public, Restricted, Private */}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Additional Settings</label>
                      <div className="checkbox-group">
                        {/* Checkbox options for notifications, invites, auto-accept */}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="gradeLevel"><Tag size={16} />Grade Level</label>
                        <select id="gradeLevel" className="form-select" value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)}>
                          <option value="">Select grade level</option>
                          {gradeLevels.map((grade) => <option key={grade} value={grade}>{grade}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="academicYear"><Calendar size={16} />Academic Year</label>
                        <input id="academicYear" type="text" className="form-input" placeholder="e.g., 2024-2025" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} />
                      </div>
                    </div>
                    {/* More advanced fields... */}
                  </div>
                )}
              </div>

              {/* Mission Management */}
              <div className="form-section">
                <div className="section-header">
                  <h2 className="section-title"><BookOpen size={20} />Class Missions</h2>
                  <button type="button" className="action-btn primary" onClick={handleCreateMission}><Plus size={16} />Create Mission</button>
                </div>
                <p className="section-description">Create engaging missions with videos, PDFs, and lectures for your students to complete.</p>
                {missions.length === 0 ? (
                  <div className="empty-state">
                    <BookOpen size={48} className="empty-state-icon" />
                    <h4>No Missions Yet</h4>
                    <p>Click "Create Mission" to build the first learning activity for your class.</p>
                  </div>
                ) : (
                  <div className="missions-list">
                    {missions.map((mission) => (
                      <div key={mission.id} className="mission-card">
                        <div className="mission-info">
                          <h4 className="mission-title">{mission.title}</h4>
                          <p className="mission-description">{mission.description}</p>
                          <div className="mission-stats">
                            <span className="stat"><FileText size={14} />{mission.content.length} items</span>
                            <span className={`stat ${mission.settings.isActive ? 'active' : 'inactive'}`}><div className="status-dot" />{mission.settings.isActive ? 'Active' : 'Inactive'}</span>
                          </div>
                        </div>
                        <div className="mission-actions">
                          <button type="button" className="icon-btn" onClick={() => handleEditMission(mission)} aria-label={`Edit ${mission.title}`}><Edit size={16} /></button>
                          <button type="button" className="icon-btn danger" onClick={() => handleDeleteMission(mission.id)} aria-label={`Delete ${mission.title}`}><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="button" className="action-btn" onClick={() => navigate('/dashboard')}>Cancel</button>
                <button type="submit" className="action-btn primary"><Save size={16} />Create Class</button>
              </div>
            </form>
          </div>

          {/* --- RIGHT COLUMN: PREVIEW --- */}
          <div className="preview-column">
            <div className="sticky-preview">
              <h2 className="section-title">Class Preview</h2>
              <div className="class-preview-card" style={{ background: backgroundOptions[selectedBackground].gradient }}>
                <div className="preview-header">
                  <div className="subject-badge"><BookOpen size={14} /><span>{subject || 'Subject'}</span></div>
                  <div className="visibility-indicator" title={`Visibility: ${classType}`}>
                    {classType === 'private' ? <Lock size={16} /> : classType === 'restricted' ? <Shield size={16} /> : <Globe size={16} />}
                  </div>
                </div>
                <h3 className="preview-title">{className || 'Class Name'}</h3>
                <p className="preview-description">{description || 'Your class description will appear here.'}</p>
                <div className="preview-footer">
                  <div className="students-info"><Users size={16} /><span>{studentCount} students</span></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* --- MISSION FORM MODAL --- */}
      {showMissionForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{currentMission ? 'Edit Mission' : 'Create New Mission'}</h3>
              <button type="button" className="icon-btn" onClick={() => setShowMissionForm(false)} aria-label="Close"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Mission Title *</label>
                <input type="text" className="form-input" placeholder="e.g., Introduction to Algebra" value={missionTitle} onChange={(e) => setMissionTitle(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" placeholder="Describe the mission objectives and activities." value={missionDescription} onChange={(e) => setMissionDescription(e.target.value)} />
              </div>

              {/* Content Management */}
              <div className="content-section">
                <div className="section-header">
                  <h4>Mission Content</h4>
                  <div className="content-type-buttons">
                    <button type="button" className="content-type-btn" onClick={() => handleAddContent('video')}><Video size={16} />Video</button>
                    <button type="button" className="content-type-btn" onClick={() => handleAddContent('pdf')}><FileText size={16} />PDF</button>
                    <button type="button" className="content-type-btn" onClick={() => handleAddContent('lecture')}><Play size={16} />Lecture</button>
                    <button type="button" className="content-type-btn" onClick={() => handleAddContent('image')}><Image size={16} />Image</button>
                  </div>
                </div>
                {sortedMissionContent.length === 0 ? (
                  <div className="empty-state small">
                    <p>No content added. Click a button above to add your first item.</p>
                  </div>
                ) : (
                  <div className="content-list">
                    {sortedMissionContent.map((content, index) => (
                      <div key={content.id} className="content-item">
                        <div className="content-header">
                          <div className="content-type-icon">{/* Icon based on type */}</div>
                          <span className="content-title-preview">{content.title || `Untitled ${content.type}`}</span>
                          <div className="content-actions">
                            <button type="button" className="icon-btn" onClick={() => handleReorderContent(content.id, 'up')} disabled={index === 0}><ChevronUp size={16} /></button>
                            <button type="button" className="icon-btn" onClick={() => handleReorderContent(content.id, 'down')} disabled={index === sortedMissionContent.length - 1}><ChevronDown size={16} /></button>
                            <button type="button" className="icon-btn danger" onClick={() => handleRemoveContent(content.id)}><Trash2 size={14} /></button>
                          </div>
                        </div>
                        <div className="content-form">
                          <input type="text" className="form-input" placeholder="Content title" value={content.title} onChange={(e) => handleUpdateContent(content.id, { title: e.target.value })} />
                          <textarea className="form-textarea" placeholder="Content description" value={content.description} onChange={(e) => handleUpdateContent(content.id, { description: e.target.value })} />
                          {['video', 'pdf', 'image'].includes(content.type) && (
                            <div className="file-upload">
                              <input type="file" id={`file-upload-${content.id}`} className="file-input" onChange={(e) => e.target.files?.[0] && handleFileUpload(content.id, e.target.files[0])} accept={content.type === 'pdf' ? '.pdf' : `${content.type}/*`} />
                              <label htmlFor={`file-upload-${content.id}`} className="upload-label">
                                <Upload size={16} />
                                {content.file ? `Change File: ${content.file.name}` : `Upload ${content.type.charAt(0).toUpperCase() + content.type.slice(1)}`}
                              </label>
                            </div>
                          )}
                          {content.type === 'lecture' && <input type="text" className="form-input" placeholder="Lecture URL (e.g., YouTube, Vimeo)" value={content.url || ''} onChange={(e) => handleUpdateContent(content.id, { url: e.target.value })} />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mission Settings */}
              <div className="settings-section">
                <h4>Mission Settings</h4>
                <div className="settings-grid">
                  {/* Setting items */}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="action-btn" onClick={() => setShowMissionForm(false)}>Cancel</button>
              <button type="button" className="action-btn primary" onClick={handleSaveMission}><Save size={16} />{currentMission ? 'Update Mission' : 'Save Mission'}</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* --- DESIGN SYSTEM & RESET --- */
        :root {
          --primary: #6366f1;
          --primary-hover: #4f46e5;
          --danger: #ef4444;
          --danger-hover: #dc2626;
          --background: #f8fafc;
          --surface: #ffffff;
          --border: #e5e7eb;
          --text-primary: #1f2937;
          --text-secondary: #6b7280;
          --text-on-primary: #ffffff;
          --radius-sm: 0.375rem;
          --radius-md: 0.5rem;
          --radius-lg: 0.75rem;
          --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: var(--background); color: var(--text-primary); }

        /* --- LAYOUT --- */
        .create-class-container { min-height: 100vh; }
        .page-header {
          background-color: var(--surface);
          padding: 1rem 2rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 1rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .page-title { font-size: 1.25rem; font-weight: 600; }
        .content-layout {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 1024px) {
          .content-layout { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); }
        }
        .preview-column { position: relative; }
        .sticky-preview { position: sticky; top: 80px; }

        /* --- FORMS & INPUTS --- */
        .form-section {
          background: var(--surface);
          padding: 2rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow);
          margin-bottom: 2rem;
        }
        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 500; color: var(--text-primary); margin-bottom: 0.5rem; }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 1rem;
          transition: var(--transition);
          background: var(--surface);
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }
        .form-textarea { resize: vertical; min-height: 100px; }
        .form-row { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        @media (min-width: 768px) { .form-row { grid-template-columns: 1fr 1fr; } }
        .form-actions { display: flex; justify-content: flex-end; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--border); margin-top: 2rem; }

        /* --- UI COMPONENTS --- */
        .section-title { font-size: 1.25rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .section-description { color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.9rem; }
        .number-picker { display: flex; align-items: center; gap: 0.5rem; }
        .number-display { font-size: 1.125rem; font-weight: 600; min-width: 2.5rem; text-align: center; }
        .background-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem; }
        .background-option {
          aspect-ratio: 16/9;
          border-radius: var(--radius-md);
          cursor: pointer;
          position: relative;
          transition: var(--transition);
          border: 3px solid transparent;
          overflow: hidden;
        }
        .background-option:hover { transform: scale(1.03); }
        .background-option.selected { border-color: var(--primary); box-shadow: var(--shadow-lg); }
        .background-name { position: absolute; bottom: 0.5rem; left: 0.75rem; color: white; font-size: 0.8rem; font-weight: 600; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
        .selected-indicator { position: absolute; top: 0.5rem; right: 0.5rem; background: var(--primary); color: white; border-radius: 50%; width: 24px; height: 24px; display: grid; place-items: center; font-weight: bold; }
        .advanced-toggle {
          background: transparent; border: none; border-radius: var(--radius-md); padding: 0.75rem; width: 100%;
          display: flex; align-items: center; justify-content: space-between; cursor: pointer; font-weight: 500;
          color: var(--text-primary); transition: var(--transition);
        }
        .advanced-toggle:hover { background: var(--background); }
        .advanced-options { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
        .empty-state { text-align: center; padding: 3rem 1rem; background-color: var(--background); border-radius: var(--radius-lg); color: var(--text-secondary); }
        .empty-state-icon { color: #cbd5e1; margin-bottom: 1rem; }
        .empty-state h4 { margin-bottom: 0.5rem; color: var(--text-primary); }

        /* --- BUTTONS --- */
        .action-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          padding: 0.65rem 1.25rem; border-radius: var(--radius-md); font-weight: 500;
          cursor: pointer; transition: var(--transition); border: 1px solid var(--border);
          background-color: var(--surface); color: var(--text-primary);
        }
        .action-btn.primary { background-color: var(--primary); color: var(--text-on-primary); border-color: var(--primary); }
        .action-btn:hover { transform: translateY(-1px); box-shadow: var(--shadow); }
        .action-btn.primary:hover { background-color: var(--primary-hover); }
        .icon-btn {
          background: transparent; border: none; color: var(--text-secondary); cursor: pointer;
          padding: 0.5rem; border-radius: 50%; display: grid; place-items: center;
          transition: var(--transition);
        }
        .icon-btn:hover { background-color: #f1f5f9; color: var(--text-primary); }
        .icon-btn.danger:hover { background-color: #fee2e2; color: var(--danger); }
        .icon-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .back-button {
          background: transparent; border: none; color: var(--text-secondary); cursor: pointer;
          padding: 0.5rem; border-radius: 50%; display: grid; place-items: center;
          transition: var(--transition);
        }
        .back-button:hover { background-color: #f1f5f9; color: var(--text-primary); }
        .number-btn {
          background: #f1f5f9; border: 1px solid var(--border); border-radius: 50%;
          width: 2rem; height: 2rem; cursor: pointer; display: grid; place-items: center;
          color: var(--text-secondary); transition: var(--transition);
        }
        .number-btn:hover { background-color: #e5e7eb; color: var(--text-primary); }

        /* --- PREVIEW CARD --- */
        .class-preview-card {
          border-radius: var(--radius-lg); padding: 1.5rem; color: white;
          min-height: 220px; display: flex; flex-direction: column;
          box-shadow: var(--shadow-lg); transition: var(--transition);
        }
        .preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .subject-badge { display: flex; align-items: center; gap: 0.5rem; background: rgba(255, 255, 255, 0.2); padding: 0.5rem 1rem; border-radius: 2rem; font-size: 0.875rem; font-weight: 500; }
        .visibility-indicator { background: rgba(255, 255, 255, 0.2); padding: 0.5rem; border-radius: var(--radius-md); }
        .preview-title { font-size: 1.75rem; font-weight: 700; margin: 0; flex-grow: 1; }
        .preview-description { font-size: 0.9rem; opacity: 0.9; margin: 0.5rem 0 1rem 0; }
        .preview-footer { display: flex; justify-content: space-between; align-items: center; }
        .students-info { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; opacity: 0.9; }

        /* --- MISSION LIST --- */
        .missions-list { display: flex; flex-direction: column; gap: 1rem; }
        .mission-card {
          border: 1px solid var(--border); border-radius: var(--radius-lg);
          padding: 1.5rem; background: var(--surface); transition: var(--transition);
          display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;
        }
        .mission-card:hover { border-color: var(--primary); box-shadow: 0 0 0 1px var(--primary); }
        .mission-info { flex: 1; }
        .mission-title { font-size: 1.125rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem; }
        .mission-description { color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem; }
        .mission-stats { display: flex; gap: 1rem; align-items: center; }
        .stat { display: flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; color: var(--text-secondary); background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); }
        .stat .status-dot { width: 8px; height: 8px; border-radius: 50%; }
        .stat.active .status-dot { background-color: #10b981; }
        .stat.inactive .status-dot { background-color: #f59e0b; }
        .mission-actions { display: flex; gap: 0.25rem; }

        /* --- MODAL --- */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.6); display: grid; place-items: center; z-index: 1000; padding: 1rem; backdrop-filter: blur(4px); }
        .modal-content {
          background: var(--background); border-radius: var(--radius-lg);
          max-width: 800px; width: 100%; max-height: 90vh;
          display: flex; flex-direction: column; box-shadow: var(--shadow-lg);
        }
        .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid var(--border); background: var(--surface); border-radius: var(--radius-lg) var(--radius-lg) 0 0; }
        .modal-header h3 { font-size: 1.25rem; font-weight: 600; }
        .modal-body { padding: 1.5rem; overflow-y: auto; }
        .modal-footer { display: flex; justify-content: flex-end; gap: 1rem; padding: 1.5rem; border-top: 1px solid var(--border); background: var(--surface); border-radius: 0 0 var(--radius-lg) var(--radius-lg); }

        /* --- MISSION CONTENT EDITOR --- */
        .content-section { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border); }
        .content-type-buttons { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .content-type-btn {
          display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem;
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md);
          color: var(--text-primary); cursor: pointer; font-size: 0.875rem; transition: var(--transition);
        }
        .content-type-btn:hover { background: #f1f5f9; border-color: #d1d5db; }
        .content-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .content-item { border: 1px solid var(--border); border-radius: var(--radius-lg); background: var(--surface); }
        .content-header { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); }
        .content-title-preview { font-weight: 500; flex-grow: 1; }
        .content-actions { display: flex; align-items: center; }
        .content-form { padding: 1rem; display: flex; flex-direction: column; gap: 1rem; }
        .file-upload { border: 2px dashed var(--border); border-radius: var(--radius-md); transition: var(--transition); }
        .file-upload:hover { border-color: var(--primary); background: #f9fafb; }
        .upload-label { display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: var(--text-secondary); cursor: pointer; font-weight: 500; padding: 1.5rem; }
        .file-input { display: none; }
      `}</style>
    </>
  );
};

export default CreateClass;