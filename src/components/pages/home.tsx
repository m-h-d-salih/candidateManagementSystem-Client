import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCandidatePage from '../auth/loginCandidate';

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    useEffect(()=>{
        const user = localStorage.getItem('userId');
        if (user) {
          setIsAuthenticated(true); 
        }
    },[])
    const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate(`/login`)
  };

  const handleViewProfile = () => {
    console.log('View Profile clicked');
  };
  if (!isAuthenticated) {
    return <LoginCandidatePage />; 
  }
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {/* Welcome Message */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, User!</h1>

      {/* Buttons */}
      <div className="space-x-4">
        {/* View Profile Button */}
        <button 
          onClick={handleViewProfile} 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500"
        >
          View Profile
        </button>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
