import React, { useEffect, useState } from 'react';
import { FaBook, FaUser, FaClipboardCheck, FaFileAlt, FaQuestion } from 'react-icons/fa';
import customAxios from '../../../Utils/customAxios';

interface DashboardData {
  course: number;
  user: number;
  transaction: number;
  assignment: number;
  quiz: number;
    content: number;
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    customAxios
      .get('/progress/dashboard') 
      .then((response) => {
        setDashboardData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []); 

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semi mb-6">Dashboard</h1>

      {dashboardData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white p-4 rounded-md flex flex-col items-center">
            <FaBook className="text-4xl mb-2" />
            <p className="text-lg font-semibold mb-2">Total Course</p>
            <p className="text-3xl">{dashboardData.course}</p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded-md flex flex-col items-center">
            <FaUser className="text-4xl mb-2" />
            <p className="text-lg font-semibold mb-2">Total User</p>
            <p className="text-3xl">{dashboardData.user}</p>
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded-md flex flex-col items-center">
            <FaClipboardCheck className="text-4xl mb-2" />
            <p className="text-lg font-semibold mb-2">Total Subscription</p>
            <p className="text-3xl">{dashboardData.transaction}</p>
          </div>

          <div className="bg-red-500 text-white p-4 rounded-md flex flex-col items-center">
            <FaFileAlt className="text-4xl mb-2" />
            <p className="text-lg font-semibold mb-2">Assignment Posted</p>
            <p className="text-3xl">{dashboardData.assignment}</p>
          </div>

          <div className="bg-purple-500 text-white p-4 rounded-md flex flex-col items-center">
            <FaQuestion className="text-4xl mb-2" />
            <p className="text-lg font-semibold mb-2">Quiz Created</p>
            <p className="text-3xl">{dashboardData.quiz}</p>
          </div>

            <div className="bg-blue-500 text-white p-4 rounded-md flex flex-col items-center">
                <FaBook className="text-4xl mb-2" />
                <p className="text-lg font-semibold mb-2">Total Content</p>
                <p className="text-3xl">{dashboardData.content}</p>
            </div>
        </div>
      ) : (
        <div>
        <div className="flex justify-center items-center text-2xl h-[70vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Dashboard;
