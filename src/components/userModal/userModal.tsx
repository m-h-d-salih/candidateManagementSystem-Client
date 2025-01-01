// UserDetailModal.tsx
import React from 'react';

interface UserDetailModalProps {
  user: {
    profileUrl: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    password: string;
  };
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center  items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <div className="flex mb-4 justify-evenly">
          <img src={user.profileUrl} alt={user.name} className="w-16 h-16 rounded-full mr-4" />
          <div>
            <h3 className="font-semibold ">{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.address}</p>
             <p className="mb-4">Password: {user.password}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
