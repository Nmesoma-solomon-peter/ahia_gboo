import React, { useState } from 'react';
import axios from 'axios';

function HostDashboardHeader(props) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      try {
        axios.get('http://localhost:5000/auth/logout', {
          withCredentials: true // Include credentials (cookies)
        }).then(response => {
          if (response.status == 200) {
            // Handle successful logout, e.g., redirect to login page
            window.location.href = '/login';
          } else {
            // Handle logout failure
            alert('Logout failed. Please try again.');
          }
        })
          .catch(error => {
            console.error('Error:', error);
            if (error.status === 401) {
              navigate("/login")
            }
          });

      } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred during logout.');
      }
    }
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center px-16">
      <h1 className="text-xl font-bold text-gray-800">Host Dashboard</h1>
      <div className="flex space-x-4 relative">
        {/* Profile Icon */}
        <button
          onClick={toggleProfileMenu}
          className="focus:outline-none"
        >
          <img
            src={props.profilePix} // profile image URL
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </button>

        {/* Profile Menu Popup */}
        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
            <ul className="py-2">
              <li>
                <a
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/account-settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Account Settings
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default HostDashboardHeader;