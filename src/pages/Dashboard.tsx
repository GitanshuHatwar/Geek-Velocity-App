import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Plus, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Target,
  Calendar,
  BarChart3,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import DashboardNav from './DashboardNav';
import { useNavigate } from 'react-router-dom';
import { getClassrooms } from './mockData';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

interface ClassroomCardProps {
  title: string;
  subject: string;
  gradientClass?: string;
}

const ClassroomCard: React.FC<ClassroomCardProps & { onClick?: () => void }> = ({ 
  title, 
  subject, 
  gradientClass, 
  onClick 
}) => (
  <div className={`classroom-card ${gradientClass || 'gradient-blue-purple'}`} onClick={onClick} style={{ cursor: 'pointer' }}>
    <div className="card-header">
      <div className="subject-badge">
        <BookOpen size={14} />
        <span className="card-text-shadow">{subject}</span>
      </div>
    </div>
    <h3 className="classroom-title card-text-shadow">{title}</h3>
  </div>
);

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="stat-card">
    <div className={`stat-icon ${color}`}>
      <Icon size={24} />
    </div>
    <div className="stat-content">
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState<Array<{id: number, date: string, title: string, type: string}>>([
    { id: 1, date: '2024-01-15', title: 'Math Class', type: 'class' },
    { id: 2, date: '2024-01-17', title: 'Science Lab', type: 'class' },
    { id: 3, date: '2024-01-20', title: 'Parent Meeting', type: 'meeting' },
    { id: 4, date: '2024-01-25', title: 'Exam Week', type: 'exam' },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    setClassrooms(getClassrooms());
  }, []);

  const gradientClasses = [
    'gradient-blue-purple',
    'gradient-pink-orange',
    'gradient-green-blue',
    'gradient-purple-pink',
    'gradient-orange-red',
    'gradient-teal-blue'
  ];

  const filteredClassrooms = classrooms.filter(classroom =>
    classroom.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    // Add empty days for padding
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    // Add all days in month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return events.filter(event => event.date === dateStr);
  };

  const addEvent = (title: string, type: string) => {
    if (selectedDate) {
      const newEvent = {
        id: Date.now(),
        date: formatDate(selectedDate),
        title,
        type
      };
      setEvents([...events, newEvent]);
      setShowAddEvent(false);
    }
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <BackgroundGradientAnimation containerClassName="dashboard-bg-gradient" />
      <div className="dashboard-container" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', overflowY: 'auto' }}>
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <div className="logo-container">
                <GraduationCap size={28} className="logo-icon" />
                <div>
                  <h1 className="dashboard-title">
                    <Sparkles size={20} className="sparkle-icon" />
                    Dashboard
                  </h1>
                  <p className="dashboard-subtitle">Your teaching hub</p>
                </div>
              </div>
            </div>
            <div className="header-right">
              <div className="notification-badge">
                <span>3</span>
              </div>
            </div>
          </div>
          
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search classrooms..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Welcome Section */}
          <div className="welcome-section">
            <div className="welcome-content">
              <div>
                <h2 className="welcome-title">
                  What's New in Learn Arena 🚀
                </h2>
                <div className="whats-new-list">
                  <div className="new-item">
                    <div className="item-dot"></div>
                    <span>New AI-powered assignment grading system</span>
                  </div>
                  <div className="new-item">
                    <div className="item-dot"></div>
                    <span>Enhanced student progress analytics dashboard</span>
                  </div>
                  <div className="new-item">
                    <div className="item-dot"></div>
                    <span>Interactive whiteboard tools for virtual classes</span>
                  </div>
                  <div className="new-item">
                    <div className="item-dot"></div>
                    <span>Automated parent-teacher communication system</span>
                  </div>
                </div>
              </div>
              <div className="welcome-illustration">
                <Sparkles size={48} className="illustration-icon" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <StatCard 
              icon={Users} 
              label="Total Students" 
              value="154" 
              color="stat-blue"
            />
            <StatCard 
              icon={BookOpen} 
              label="Active Classes" 
              value={classrooms.length.toString()} 
              color="stat-purple"
            />
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3 className="section-title">Quick Actions</h3>
            <div className="actions-grid">
              <button className="action-button action-primary" onClick={() => navigate('/create-class')}>
                <Plus size={20} />
                <span>New Class</span>
              </button>
              <button className="action-button action-secondary" onClick={() => setShowCalendar(true)}>
                <Calendar size={20} />
                <span>Schedule</span>
              </button>
              <button className="action-button action-tertiary">
                <BarChart3 size={20} />
                <span>Analytics</span>
              </button>
            </div>
          </div>

          {/* Classrooms Grid */}
          <div className="classrooms-section">
            <div className="section-header">
              <h3 className="section-title">Your Classrooms</h3>
              <span className="section-badge">{filteredClassrooms.length}</span>
            </div>
            
            <div className="classrooms-grid">
              {filteredClassrooms.map((classroom, index) => (
                <ClassroomCard 
                  key={classroom.id} 
                  title={classroom.title} 
                  subject={classroom.subject}
                  gradientClass={gradientClasses[index % gradientClasses.length] || 'gradient-blue-purple'}
                  onClick={() => navigate(`/classroom/${classroom.id}`)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <button className="nav-item active">
            <TrendingUp size={20} />
            <span>Dashboard</span>
          </button>
          <button className="nav-item">
            <BookOpen size={20} />
            <span>Classes</span>
          </button>
          <button className="nav-item">
            <Users size={20} />
            <span>Students</span>
          </button>
          <button className="nav-item">
            <Target size={20} />
            <span>Goals</span>
          </button>
        </div>

        <DashboardNav active="Home" />
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="calendar-overlay" onClick={() => setShowCalendar(false)}>
          <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
            <div className="calendar-header">
              <div className="calendar-nav">
                <button className="nav-btn" onClick={prevMonth}>‹</button>
                <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                <button className="nav-btn" onClick={nextMonth}>›</button>
              </div>
              <button className="close-btn" onClick={() => setShowCalendar(false)}>×</button>
            </div>
            
            <div className="calendar-content">
              <div className="calendar-actions">
                <button className="action-btn primary" onClick={() => setShowAddEvent(true)}>
                  <Plus size={16} />
                  Add Event
                </button>
                <button className="action-btn secondary">
                  <Calendar size={16} />
                  View Tasks
                </button>
                <button className="action-btn secondary">
                  <Users size={16} />
                  Meetings
                </button>
              </div>

              <div className="calendar-grid">
                {dayNames.map(day => (
                  <div key={day} className="calendar-day-header">{day}</div>
                ))}
                
                {getDaysInMonth(currentDate).map((date, index) => (
                  <div
                    key={index}
                    className={`calendar-day ${date ? 'has-date' : ''} ${
                      selectedDate && date && formatDate(date) === formatDate(selectedDate) ? 'selected' : ''
                    }`}
                    onClick={() => date && setSelectedDate(date)}
                  >
                    {date && (
                      <>
                        <span className="day-number">{date.getDate()}</span>
                        {getEventsForDate(date).map(event => (
                          <div key={event.id} className={`event-marker ${event.type}`}>
                            {event.title}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEvent && selectedDate && (
        <div className="modal-overlay" onClick={() => setShowAddEvent(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Event for {selectedDate.toDateString()}</h3>
            <div className="modal-form">
              <input
                type="text"
                placeholder="Event title"
                id="eventTitle"
                className="modal-input"
              />
              <select id="eventType" className="modal-select">
                <option value="class">Class</option>
                <option value="meeting">Meeting</option>
                <option value="exam">Exam</option>
                <option value="task">Task</option>
              </select>
              <div className="modal-actions">
                <button 
                  className="modal-btn secondary" 
                  onClick={() => setShowAddEvent(false)}
                >
                  Cancel
                </button>
                <button 
                  className="modal-btn primary" 
                  onClick={() => {
                    const title = (document.getElementById('eventTitle') as HTMLInputElement)?.value;
                    const type = (document.getElementById('eventType') as HTMLSelectElement)?.value;
                    if (title) addEvent(title, type);
                  }}
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Header */
        .dashboard-header {
          padding: 1.5rem 1rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 10;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
          padding: 8px;
          border-radius: 12px;
        }

        .dashboard-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sparkle-icon {
          color: #f59e0b;
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(45deg); }
        }

        .dashboard-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        .notification-badge {
          width: 32px;
          height: 32px;
          background: #ef4444;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        .search-container {
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #e5e7eb;
          border-radius: 1rem;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          background: white;
          color: #374151;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .search-input:focus {
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
          padding: 4px;
          border-radius: 6px;
        }

        /* Main Content */
        .main-content {
          padding: 1.5rem 1rem 6rem 1rem;
          position: relative;
          z-index: 5;
        }

        /* Welcome Section */
        .welcome-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .welcome-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .welcome-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 0.5rem 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .whats-new-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .new-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: #4b5563;
        }

        .item-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .illustration-icon {
          color: #667eea;
          opacity: 0.6;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 1rem;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .stat-icon {
          padding: 0.75rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-blue { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; }
        .stat-purple { background: linear-gradient(135deg, #8b5cf6, #5b21b6); color: white; }
        .stat-green { background: linear-gradient(135deg, #10b981, #047857); color: white; }
        .stat-orange { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        /* Quick Actions */
        .quick-actions {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin: 0 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
        }

        .action-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border: none;
          border-radius: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .action-primary {
          background: rgba(99, 102, 241, 0.9);
          color: white;
        }

        .action-secondary {
          background: rgba(16, 185, 129, 0.9);
          color: white;
        }

        .action-tertiary {
          background: rgba(245, 158, 11, 0.9);
          color: white;
        }

        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        /* Classrooms Section */
        .classrooms-section {
          margin-bottom: 2rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .section-badge {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .classrooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .classroom-card {
          border-radius: 1.5rem;
          padding: 1.5rem;
          color: white;
          cursor: pointer;
          transform: scale(1);
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .classroom-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: inherit;
          filter: brightness(1.1);
          z-index: -1;
        }

        .classroom-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .card-header {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 1rem;
        }

        .subject-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .classroom-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          line-height: 1.3;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .students-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .arrow-icon {
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .classroom-card:hover .arrow-icon {
          opacity: 1;
          transform: translateX(4px);
        }

        /* Gradient Classes */
        .gradient-blue-purple {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .gradient-pink-orange {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .gradient-green-blue {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .gradient-purple-pink {
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
        }

        .gradient-orange-red {
          background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
        }

        .gradient-teal-blue {
          background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
        }

        /* Bottom Navigation */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1rem 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 50;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 500;
          transition: all 0.3s ease;
          border-radius: 0.75rem;
        }

        .nav-item.active {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .nav-item:not(.active) {
          color: #9ca3af;
        }

        .nav-item:hover {
          color: #667eea;
          background: rgba(102, 126, 234, 0.05);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .classrooms-grid {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .welcome-content {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
        }

        @media (max-width: 640px) {
          .dashboard-header {
            padding: 1rem 0.75rem;
          }
          .main-content {
            padding: 1rem 0.75rem 6rem 0.75rem;
          }
          .welcome-section {
            padding: 1.5rem;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .actions-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 480px) {
          .dashboard-title {
            font-size: 1.25rem;
          }
          .welcome-title {
            font-size: 1.5rem;
          }
          .classroom-title {
            font-size: 1.125rem;
          }
        }

        .card-text-shadow {
          text-shadow: 0 2px 8px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.25);
        }

        .dashboard-bg-gradient {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
        }
        .dashboard-container {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          overflow-y: auto;
        }

        .calendar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .calendar-modal {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .calendar-header h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
        }

        .calendar-day {
          aspect-ratio: 1;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .calendar-day:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        .calendar-day.marked {
          background: #fef3c7;
          border-color: #f59e0b;
        }

        .day-number {
          font-weight: 500;
          color: #374151;
        }

        .class-marker {
          position: absolute;
          bottom: 2px;
          left: 2px;
          right: 2px;
          background: #f59e0b;
          color: white;
          font-size: 0.6rem;
          padding: 1px 3px;
          border-radius: 2px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .calendar-nav {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nav-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
        }

        .nav-btn:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .calendar-actions {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .action-btn.primary {
          background: #667eea;
          color: white;
        }

        .action-btn.primary:hover {
          background: #5a67d8;
        }

        .action-btn.secondary {
          background: #f3f4f6;
          color: #374151;
        }

        .action-btn.secondary:hover {
          background: #e5e7eb;
        }

        .calendar-day-header {
          text-align: center;
          font-weight: 600;
          color: #6b7280;
          padding: 0.5rem;
          font-size: 0.875rem;
        }

        .calendar-day {
          aspect-ratio: 1;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          min-height: 60px;
        }

        .calendar-day.has-date:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        .calendar-day.selected {
          background: #dbeafe;
          border-color: #3b82f6;
        }

        .day-number {
          font-weight: 500;
          color: #374151;
          font-size: 0.875rem;
        }

        .event-marker {
          position: absolute;
          bottom: 2px;
          left: 2px;
          right: 2px;
          color: white;
          font-size: 0.6rem;
          padding: 1px 3px;
          border-radius: 2px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .event-marker.class {
          background: #10b981;
        }

        .event-marker.meeting {
          background: #f59e0b;
        }

        .event-marker.exam {
          background: #ef4444;
        }

        .event-marker.task {
          background: #8b5cf6;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .modal-content {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-content h3 {
          margin: 0 0 1.5rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .modal-input, .modal-select {
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .modal-input:focus, .modal-select:focus {
          border-color: #667eea;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1rem;
        }

        .modal-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .modal-btn.primary {
          background: #667eea;
          color: white;
        }

        .modal-btn.primary:hover {
          background: #5a67d8;
        }

        .modal-btn.secondary {
          background: #f3f4f6;
          color: #374151;
        }

        .modal-btn.secondary:hover {
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;