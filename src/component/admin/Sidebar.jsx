import { 
  LayoutDashboard, 
  Package, 
  CreditCard, 
  ShoppingCart, 
  FileCheck,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  ShoppingBag,
  Store
} from "lucide-react";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { getToken } from "../../module/Auth/token";
import { getSidebarState, getStore, getStoreUrl, handleLogout, saveSidebarState } from "../../utils/utils";

const AdminSidebar = ({currentPage='Dashboard'}) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(getSidebarState());
  const [activeItem, setActiveItem] = useState(currentPage);

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard"
    },
    {
      name: "Inventory",
      icon: Package,
      path: "/inventory/"
    },
    {
      name: "Transaction",
      icon: CreditCard,
      path: "/transaction/"
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      path: "/admin-orders/"
    },
     {
      name: "Checkout",
      icon: ShoppingBag,
      path: "/checkout/"
    },
    {
      name: "Audit",
      icon: FileCheck,
      path: "/audit-trail"
    },
   
  ];


  const handleItemClick = (itemName) => {
    setActiveItem(itemName.name);
    navigate(itemName.path);
  };

  return (
    <div className={`bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-3 transition-opacity duration-200 ${
            isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
          }`}>
            <div className="w-8 h-8 bg-white rounded-none flex items-center justify-center">
              {!getStoreUrl() && <Store className="w-5 h-5 text-gray-900" />}
              {getStoreUrl() &&<img 
                src={getStoreUrl()}
                alt="Store Logo"
                className="w-full h-full object-cover rounded-none"
              />}
            </div>
            <div>
              <h3 className="font-medium text-sm uppercase tracking-wider">{getStore()}</h3>
              <p className="text-xs text-gray-400 font-light">Management System</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsCollapsed(saveSidebarState(!isCollapsed))}
            className="p-1.5 hover:bg-gray-800 rounded-none transition-all duration-200 hover:scale-110"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center px-3 py-3 text-left transition-all duration-200 group relative overflow-hidden cursor-pointer ${
                    isActive 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'slideIn 0.3s ease-out forwards'
                  }}
                >
                  {/* Active indicator */}
                  <div className={`absolute left-0 top-0 h-full w-1 bg-white transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  {/* Icon */}
                  <div className={`flex-shrink-0 transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`}>
                    <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''}`} />
                  </div>
                  
                  {/* Label */}
                  <span className={`ml-3 font-light tracking-wide transition-all duration-200 ${
                    isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                  }`}>
                    {item.name}
                  </span>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-200" />
                </button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-16 top-0 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-none opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
                    {item.name}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800"></div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="border-t border-gray-800 p-2">
        <div className={`p-3 transition-opacity duration-200 ${
          isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gray-700 rounded-none flex items-center justify-center">
              <User className="w-4 h-4 text-gray-300" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{getToken()?.firstName} {getToken()?.lastName}</p>
              <p className="text-xs text-gray-400">{getToken()?.email}</p>
            </div>
          </div>
        </div>
        
        <button onClick={() => handleLogout('/')} className={`w-full cursor-pointer flex items-center px-3 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 group ${
          isCollapsed ? 'justify-center' : ''
        }`}>
          <LogOut className={`w-5 h-5 group-hover:scale-105 transition-transform duration-200 ${
            isCollapsed ? '' : 'mr-3'
          }`} />
          <span className={`font-light tracking-wide transition-all duration-200 ${
            isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
          }`}>
            Logout
          </span>
        </button>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        li {
          position: relative;
        }
        
        li:hover .absolute.left-16 {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default AdminSidebar;