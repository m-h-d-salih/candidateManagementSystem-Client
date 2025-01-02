import React, { useEffect, useState } from 'react';
import SearchBar from '../searchBar/searchBar';
import UserTable from '../table/table';
import Pagination from '../pagination/pagination';
import CreateCandidate from '../create/createCanidate';
import { useQuery } from '@tanstack/react-query';
import api from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
import LoginCandidatePage from '../auth/loginCandidate';

const fetchCandidates = async () => {
  const {data} = await api.get('/admin/candidates');
  const {candidates,totalCandidates}=data?.data;
  return {candidates,totalCandidates}  ;
};
const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    // const [candidates, setCandidates] = useState([])
    const navigate=useNavigate()
  const [candidates, setCandidates] = useState([]);
  
  const { data,isLoading } = useQuery({
    queryKey: ['candidates'],
    queryFn: fetchCandidates,
  })
//  const {candidates,totalCandidates}=data;
// console.log(data)
useEffect(() => {
  if (data?.candidates) {
    setCandidates(data.candidates);
  }
}, [data]);
useEffect(() => {
  const admin = localStorage.getItem('adminId');
  if (admin) {
    setIsAuthenticated(true); 
  }
}, []);
  const itemsPerPage = 2;

  // const filteredUsers = candidates.filter(
  //   (user) =>
  //     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.address.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const paginatedUsers = filteredUsers.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // const handleDelete = (email: string) => {
  //   setCandidates(candidates.filter((user) => user.email !== email));
  // };
  const handleLogout=()=>{
    localStorage.clear();
    navigate('/')
  }
  if (!isAuthenticated) {
    return <LoginCandidatePage />; // If not authenticated, show the LoginCandidatePage
  }
  return (
    <>
      <div className="p-10">
        {/* Centered Title */}
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl text-black">Dashboard</h1>
        </div>

        {/* Row for Search Bar and Button */}
        <div className="flex justify-between items-center mb-6">
          <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
          <button
            onClick={() => setIsModalOpen(true)} // Open the modal
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            +
          </button>
        </div>

        <UserTable users={candidates} onDelete={()=>console.log(`hi`)} isLoading={isLoading} />
        
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(candidates.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />

        {/* Modal for creating new candidate */}
        {isModalOpen && (
          <CreateCandidate
            onClose={() => setIsModalOpen(false)} // Close the modal
            onSubmit={(newUser) => {
              // setCandidates([...candidates, newUser]); // Add the new user to the list
              setIsModalOpen(false);
            }}
          />
        )}
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Dashboard;
