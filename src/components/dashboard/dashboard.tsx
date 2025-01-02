import React, { useEffect, useState } from 'react';
import UserTable from '../table/table';
import CreateCandidate from '../create/createCanidate';
import { useQuery } from '@tanstack/react-query';
import api from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
import LoginCandidatePage from '../auth/loginCandidate';


const Dashboard: React.FC = () => {
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate=useNavigate()
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    const {data} = await api.get('/admin/candidates');
    const {candidates,totalCandidates}=data?.data;
    return {candidates,totalCandidates}  ;
  };
  const { data,isLoading ,refetch} = useQuery({
    queryKey: ['candidates'],
    queryFn: fetchCandidates,
  })

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


  
  const handleLogout=()=>{
    localStorage.clear();
    navigate('/')
  }
  if (!isAuthenticated) {
    return <LoginCandidatePage />; 
  }
  return (
    <>
      <div className="p-10 ">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl text-black font-extrabold">Dashboard</h1>
        </div>
      <h2 className='text-2xl '>Total candidates : {data?.totalCandidates}</h2>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsModalOpen(true)} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            +
          </button>
        </div>

        <UserTable users={candidates} refetch={refetch} isLoading={isLoading} />

        {isModalOpen && (
          <CreateCandidate
            onClose={() => {setIsModalOpen(false),refetch()}} 
            onSubmit={() => {
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
      <button className='bg-blue-500 ml-10 text-white px-4 py-2 rounded hover:bg-blue-600' onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
