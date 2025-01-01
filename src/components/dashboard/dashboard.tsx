import React, { useEffect, useState } from 'react';
import SearchBar from '../searchBar/searchBar';
import UserTable from '../table/table';
import Pagination from '../pagination/pagination';
import CreateCandidate from '../create/createCanidate';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import api from '../../axios/axios';
import { useNavigate } from 'react-router-dom';

const fetchCandidates = async () => {
  const {data} = await api.get('/admin/candidates');
  const {candidates,totalCandidates}=data?.data;
  return {candidates,totalCandidates}  ;
};
const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
    // const [candidates, setCandidates] = useState([])
    const navigate=useNavigate()
  const [candidates, setCandidates] = useState([]);
  
  const { data,isLoading } = useQuery({
    //    ^? const data: number | undefined
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

        <UserTable users={candidates} onDelete={()=>console.log(`hi`)}  />
        
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
