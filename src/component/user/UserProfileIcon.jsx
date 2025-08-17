import React, { useState } from 'react';
import { User, Eye, Package, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock Link component for demonstration - replace with your actual Link component
const Link = ({ to, children, className, label }) => {
  return <a href={to} className={className}>{children}</a>
}

const ProfileDropdown = ({ storeName, userName = "John Doe" }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownItems = [
    {
      icon: <Eye size={16} />,
      label: "View Profile",
      link: `/profile?storeName=${storeName}`
    },
    {
      icon: <Package size={16} />,
      label: "See Orders",
      link: `/orders?storeName=${storeName}`
    },
    {
      icon: <LogOut size={16} />,
      label: "Logout",
      link: `/logout?storeName=${storeName}`,
    }
  ];

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setTimeout(() => setIsOpen(false), 2000)} // Delay to allow click events to register
    >
      {/* Profile Button */}
      <button className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User size={16} className="text-white" />
        </div>
        <span className="hidden sm:inline">{userName}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 transform transition-all duration-200 origin-top-right ${
        isOpen 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
      }`}>
        {/* User Info Header */}
        <div className="px-4 py-2 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-800">{userName}</p>
          <p className="text-xs text-gray-500">Welcome back!</p>
        </div>

        {/* Menu Items */}
        {dropdownItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
            label={item.label}
          >
            <span className="text-gray-400">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};


export default ProfileDropdown;