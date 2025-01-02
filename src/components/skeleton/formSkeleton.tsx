import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-6 py-8">
      {/* Page Title Skeleton */}
      <div className="h-8 bg-gray-300 rounded-md w-1/3 mb-6 animate-pulse"></div>

      {/* Card Skeleton */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex flex-col items-center">
          {/* Profile Image Skeleton */}
          <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 animate-pulse"></div>

          {/* Input Skeletons */}
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="mb-4 w-full">
                <div className="h-5 bg-gray-300 rounded-md w-1/4 mb-2 animate-pulse"></div>
                <div className="h-10 bg-gray-300 rounded-md w-full animate-pulse"></div>
              </div>
            ))}

          {/* View Resume Skeleton */}
          <div className="mb-4 w-full">
            <div className="h-5 bg-gray-300 rounded-md w-1/4 mb-2 animate-pulse"></div>
          </div>

          {/* Upload Inputs Skeleton */}
          <div className="mb-4 w-full">
            <div className="h-5 bg-gray-300 rounded-md w-1/3 mb-2 animate-pulse"></div>
            <div className="h-10 bg-gray-300 rounded-md w-full animate-pulse"></div>
          </div>
          <div className="mb-6 w-full">
            <div className="h-5 bg-gray-300 rounded-md w-1/3 mb-2 animate-pulse"></div>
            <div className="h-10 bg-gray-300 rounded-md w-full animate-pulse"></div>
          </div>

          {/* Button Skeleton */}
          <div className="h-12 bg-gray-300 rounded-md w-full animate-pulse"></div>
        </div>
      </div>

      {/* Logout Button Skeleton */}
      <div className="mt-6 w-1/4">
        <div className="h-12 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
