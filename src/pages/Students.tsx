import React, { useState, useEffect } from 'react';
import { Search, Users } from 'lucide-react';
import DashboardNav from './DashboardNav';
import { TextShimmer } from '@/components/ui/text-shimmer';
import axios from 'axios';

const StudentCard: React.FC<{ student: any }> = ({ student }) => (
  <div className="student-card">
    <div className="student-avatar">
      {student.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
    </div>
    <div className="student-info">
      <h3 className="student-name">{student.name}</h3>
      <p className="student-email">{student.email}</p>
      <div className="student-xp-container">
        <span className="xp-badge">XP: {student.xp}</span>
      </div>
    </div>
  </div>
);

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('http://localhost:5001/api/students/leaderboard');
        setStudents(res.data);
      } catch (err) {
        setError('Failed to fetch students.');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Table view: sort by xp descending
  const sortedStudents = [...filteredStudents].sort((a, b) => b.xp - a.xp);

  return (
    <>
      <div className="dashboard-container">
        <div className="main-content">
          <h2 className="welcome-title">
            <Users size={24} style={{ color: '#6366f1' }} />
            <TextShimmer
              duration={1.2}
              className="[--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
              as="span"
            >
              Students
            </TextShimmer>
          </h2>
          <p className="welcome-subtitle">
            Manage and track your students. Search to find specific students.
          </p>

          {/* Search */}
          <div className="search-filter-container">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search students..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="view-toggle">
            <button
              className={`view-button ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
            >
              Cards
            </button>
            <button
              className={`view-button ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              Table
            </button>
          </div>

          <div className="students-count">
            {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
          </div>

          {loading ? (
            <div className="no-students">Loading...</div>
          ) : error ? (
            <div className="no-students">{error}</div>
          ) : filteredStudents.length > 0 ? (
            viewMode === 'cards' ? (
              <div className="students-list">
                {filteredStudents.map((student) => (
                  <StudentCard key={student._id || student.id} student={student} />
                ))}
              </div>
            ) : (
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>XP</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStudents.map(student => (
                    <tr key={student._id || student.id}>
                      <td style={{ fontWeight: 500 }}>{student.name}</td>
                      <td style={{ color: '#6b7280' }}>{student.email}</td>
                      <td style={{ color: '#6366f1', fontWeight: 600 }}>{student.xp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : (
            <div className="no-students">
              <div className="no-students-icon">👥</div>
              <h3>No students found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>
        <DashboardNav active="Students" />
      </div>
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background-color: #f8f9fa;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .main-content {
          padding: 1.5rem 1rem;
          padding-bottom: 6rem;
        }
        .welcome-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .welcome-subtitle {
          color: #6b7280;
          margin: 0 0 1.5rem 0;
          font-size: 1rem;
        }
        .search-filter-container {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          margin-bottom: 1rem;
        }
        .search-container {
          position: relative;
          flex: 1;
        }
        .search-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
          background-color: white;
          box-sizing: border-box;
        }
        .search-input:focus {
          border-color: #6366f1;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }
        .view-toggle {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .view-button {
          padding: 0.5rem 1rem;
          border: 2px solid #e5e7eb;
          background-color: white;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .view-button.active {
          border-color: #6366f1;
          background-color: #6366f1;
          color: white;
        }
        .students-count {
          margin-bottom: 1rem;
          color: #6b7280;
          font-size: 0.875rem;
        }
        .students-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .student-card {
          background-color: white;
          border-radius: 1rem;
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
          cursor: pointer;
        }
        .student-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }
        .student-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .student-info {
          flex: 1;
          min-width: 0;
        }
        .student-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.25rem 0;
        }
        .student-email {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 0 0 0.5rem 0;
        }
        .student-xp-container {
          display: flex;
          align-items: center;
        }
        .xp-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          background: #e0e7ff;
          color: #3730a3;
        }
        .students-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .students-table thead {
          background: #f3f4f6;
          text-align: left;
        }
        .students-table th {
          padding: 12px 16px;
          font-weight: 600;
          color: #374151;
        }
        .students-table td {
          padding: 10px 16px;
          border-bottom: 1px solid #f1f1f1;
        }
        .students-table tr:last-child td {
          border-bottom: none;
        }
        .no-students {
          text-align: center;
          padding: 3rem 1rem;
          color: #6b7280;
        }
        .no-students-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        /* Bottom nav styles to match all dashboard pages */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255,255,255,0.98);
          border-top: 1px solid #e5e7eb;
          padding: 0.75rem 0 0.5rem 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 50;
          box-shadow: 0 -2px 12px 0 rgba(0,0,0,0.04);
        }
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.15rem;
          padding: 0.5rem 0.75rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 500;
          color: #9ca3af;
          transition: color 0.2s, background 0.2s;
          border-radius: 10px;
        }
        .nav-item.active {
          color: #6366f1;
          background: rgba(99,102,241,0.08);
        }
        .nav-item:not(.active):hover {
          color: #6366f1;
          background: rgba(99,102,241,0.04);
        }
        .nav-label {
          font-size: 0.78rem;
          margin-top: 2px;
        }
        @media (max-width: 640px) {
          .search-filter-container {
            flex-direction: column;
            gap: 0.75rem;
          }
          .search-container {
            width: 100%;
          }
          .students-table {
            font-size: 0.875rem;
          }
          .students-table th,
          .students-table td {
            padding: 8px 12px;
          }
        }
        @media (max-width: 480px) {
          .welcome-title {
            font-size: 1.25rem;
          }
          .student-card {
            padding: 0.75rem;
          }
          .student-avatar {
            width: 45px;
            height: 45px;
            font-size: 0.875rem;
          }
          .student-name {
            font-size: 1rem;
          }
          .students-table {
            display: none;
          }
          .view-toggle {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Students;