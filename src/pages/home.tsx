import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCandidatePage from '../components/auth/loginCandidate';
import api from '../axios/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import ProfileSkeleton from '../components/skeleton/formSkeleton';
import { toast } from 'react-toastify';



const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [profile, setProfile] = useState<boolean>(false);
  const [resume, setresume] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<any>({
    name: '',
    email: '',
    phone: '',
    photo: '',
    resume: ''
  });
  const fetchCandidate = async () => {
    const {data} = await api.get(`/candidate/${userId}`);
    return data ?.data ;
  };
  useEffect(() => {
    const user = localStorage.getItem('userId');
    if (user) {
      setIsAuthenticated(true); 
      setUserId(user)
    }
  }, []);

  const navigate = useNavigate();
  const uploadProfilePicture = async (file: any) => {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await api.put(`/candidate/upload/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  };
  const uploadResume = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.put(`/candidate/uploadResume/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  };
  const { mutate: handleProfileUpload, isPending: isUploading } = useMutation( {
    mutationFn:uploadProfilePicture,
    onSuccess: () => {
      toast.success('profile updated successfully')
      
      refetch(); 
    },
    onError: (error:any) => {
      console.error('Error uploading profile picture:', error);
      toast.error(`Error uploading profile picture`)
    },
  });
  const { mutate: handleResumeUpload, isPending } = useMutation( {
    mutationFn:uploadResume,
    onSuccess: () => {
      toast.success('resume updated successfully')
      
      refetch(); 
    },
    onError: (error:any) => {
      console.error('Error uploading resume :', error);
      toast.error(`Error uploading resume`)
    },
  });
  const handleLogout = () => {
    localStorage.clear();
    navigate(`/login`);
  };   
  const { data:candidate,isLoading,refetch } = useQuery({
    queryKey: ['candidate'],
    queryFn: fetchCandidate,
  })
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setUserDetails({
        ...userDetails,
        [name]: URL.createObjectURL(files[0]) // For image preview
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // console.log('User details saved');
  };
    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setProfile(true)
    if (files && files[0]) {
      handleProfileUpload(files[0]);
    }
  };
    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      handleResumeUpload(files[0]);
    }
  };

  if (!isAuthenticated) {
    return <LoginCandidatePage />;
  }
  if(isLoading)
    return <ProfileSkeleton/>

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {candidate.name || 'User'}!</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="mb-4">
            {candidate.profileUrl ? (
              <img src={candidate.profileUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
            ) : (
              <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                No Image
              </div>
            )}
          </div>

          {/* Name */}
          <div className="mb-4 w-full">
            <label className="block text-sm font-semibold text-gray-600">Name</label>
            <input
              type="text"
              value={candidate.name}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Email */}
          <div className="mb-4 w-full">
            <label className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              value={candidate.email}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Phone */}
          <div className="mb-4 w-full">
            <label className="block text-sm font-semibold text-gray-600">Phone</label>
            <input
              type="text"
              value={candidate.phone}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Password */}
          <div className="mb-4 w-full">
            <label className="block text-sm font-semibold text-gray-600">Password</label>
            <input
              type="text"
              value={candidate.password}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* View Resume */}
          {candidate.resume && (
            <div className="mb-4">
              <a
                href={candidate.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500"
              >
                View Resume
              </a>
            </div>
          )}

          {/* Upload Photo */}
          <div className="mb-4 w-full">
            <label htmlFor="photo" className="block text-sm font-semibold text-gray-600">Upload Profile Picture</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleProfileChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Upload Resume */}
          <div className="mb-6 w-full">
            <label htmlFor="resume" className="block text-sm font-semibold text-gray-600">Upload Resume</label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleResumeChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500"
          >
            {isUploading || isPending?'uploading':'Save Changes'}
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
