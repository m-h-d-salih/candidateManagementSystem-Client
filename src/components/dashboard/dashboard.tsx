import React, { useState } from 'react';
import SearchBar from '../searchBar/searchBar';
import UserTable from '../table/table';
import Pagination from '../pagination/pagination';


const Dashboard: React.FC = () => {
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

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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
    <div className='flex justify-center mt-2'><h1 className='text-3xl text-black'>Dashboard</h1></div>
      <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
      <UserTable users={paginatedUsers} onDelete={handleDelete} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
        onPageChange={setCurrentPage}
        />
    </div>
        </>
  );
};

export default Dashboard;
