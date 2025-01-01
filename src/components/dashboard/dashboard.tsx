import React, { useState } from 'react';
import SearchBar from '../searchBar/searchBar';
import UserTable from '../table/table';
import Pagination from '../pagination/pagination';
import CreateCandidate from '../create/createCanidate';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import api from '../../axios/axios';

const fetchCandidates = async () => {
    const {data} = await api.get('/admin/candidates'); // Make your API call here
    return data || [];
  };
const Dashboard: React.FC = () => {
    const [candidates, setCandidates] = useState([])
  const [users, setUsers] = useState([
    {
      profileImg: 'https://via.placeholder.com/50',
      name: 'John Doe',
      address: '123 Main St',
      phone: '123-456-7890',
      email: 'john@example.com',
      password: 'password123',
    },
    {
      profileImg: 'https://via.placeholder.com/50',
      name: 'John Doe',
      address: '123 Main St',
      phone: '123-456-7890',
      email: 'john@example.com',
      password: 'password123',
    },
    {
      profileImg: 'https://via.placeholder.com/50',
      name: 'John ',
      address: '123 Main St',
      phone: '123-456-7890',
      email: 'john@example.com',
      password: 'password123',
    },
    {
      profileImg: 'https://via.placeholder.com/50',
      name: ' Doe',
      address: '123 Main St',
      phone: '123-456-7890',
      email: 'john@example.com',
      password: 'password123',
    },
    // Add more dummy users here...
  ]);
  
  const { data } = useQuery({
    //    ^? const data: number | undefined
    queryKey: ['candidates'],
    queryFn: fetchCandidates,
  })
  console.log(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 2;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (email: string) => {
    setUsers(users.filter((user) => user.email !== email));
  };

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

        <UserTable users={paginatedUsers} onDelete={handleDelete} />
        
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />

        {/* Modal for creating new candidate */}
        {isModalOpen && (
          <CreateCandidate
            onClose={() => setIsModalOpen(false)} // Close the modal
            onSubmit={(newUser) => {
              setUsers([...users, newUser]); // Add the new user to the list
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
