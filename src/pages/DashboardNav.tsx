import React from 'react';
import { Home, Users, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface DashboardNavProps {
  active: 'Home' | 'Students' | 'Profile';
}

const navItems = [
  { icon: Home, label: 'Home', route: '/dashboard' },
  { icon: Users, label: 'Students', route: '/students' },
  { icon: User, label: 'Profile', route: '/profile' },
];

const DashboardNav: React.FC<DashboardNavProps> = ({ active }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-item${active === item.label ? ' active' : ''}`}
            onClick={() => navigate(item.route)}
          >
            <item.icon size={22} />
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
      <style>{`
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
        @media (max-width: 480px) {
          .bottom-nav {
            padding: 0.5rem 0 0.25rem 0;
          }
          .nav-item {
            font-size: 0.7rem;
            padding: 0.4rem 0.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default DashboardNav; 