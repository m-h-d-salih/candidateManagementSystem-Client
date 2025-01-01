import React from 'react';

const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {Array.from({ length: 5 }).map((_, index) => (
              <th
                key={index}
                className="px-4 py-2 bg-gray-100 border border-gray-200"
              >
                <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 5 }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-4 border border-gray-200"
                >
                  <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
