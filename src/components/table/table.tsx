import React, { useState } from 'react';
import UserDetailModal from '../userModal/userModal';

interface User {
  profileImg: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

interface UserTableProps {
  users: User[];
  onDelete: (email: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const handleRowClick = (user: User) => {
        setSelectedUser(user); // Set the selected user to open the modal
      };
    
      const handleCloseModal = () => {
        setSelectedUser(null); // Close the modal by resetting the selected user
      };
  return (
    <table className="w-full bg-white border-collapse border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 px-4 py-2">Profile</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Address</th>
          <th className="border border-gray-300 px-4 py-2">Phone</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
          <th className="border border-gray-300 px-4 py-2">Password</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index} className="hover:bg-gray-100" onClick={() => handleRowClick(user)}>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <img
                src={user.profileImg}
                alt={user.name}
                className="w-10 h-10 rounded-full mx-auto"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
            <td className="border border-gray-300 px-4 py-2">{user.address}</td>
            <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            <td className="border border-gray-300 px-4 py-2">{user.password}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <button
                onClick={() => onDelete(user.email)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </table>
  );
};

export default UserTable;
