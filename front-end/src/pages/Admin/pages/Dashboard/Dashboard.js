import React, { useEffect, useState } from 'react';
import Navbar from '../../components/AdminNavbar';  
import Sidebar from '../../components/AdminSidebar'; 
import './Dashboard.css';
import { Pie, Bar } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js'; 

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalAuctions: 0,
    ongoingAuctions: 0,
    pendingApproval: 0,
    bidders: 0,
    sellers: 0
  });

  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7281/api/Admin/statistics');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setCalendarDate(date);
  };

 
  const pieData = {
    labels: ['Approved Auctions', 'Pending Auctions', 'Completed Auctions'],
    datasets: [
      {
        data: [dashboardData.totalAuctions - dashboardData.pendingProductApprovals, dashboardData.pendingProductApprovals, dashboardData.ongoingAuctions],
        // backgroundColor: ['#4CAF50', '#FFEB3B', '#FF5722'],
        // data: [dashboardData.totalAuctions - 23, 45, 65],
        backgroundColor: ['#1a1a54', '#d7d7f3', '#6a6aef'],
      },
    ],
  };




  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || '';
            return `${label}: ${value}`; 
          },
        },
      },
    },
  };


 
  const barData = {
    labels: ['Users', 'Auctions', 'Bidders', 'Sellers'],
    datasets: [
      {
        label: 'Numbers',
        backgroundColor: '#1A1A54',
        data: [dashboardData.totalUsers, dashboardData.totalAuctions, dashboardData.totalBidders, dashboardData.totalSellers],
      },
    ],
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-main-content">
        <Sidebar />
        <div className="dashboard-content">
          <h1>Dashboard Overview</h1>
          <div className="dashboard-stats">
            <div className="stat-item">
              <h2>{dashboardData.totalUsers}</h2>
              <p>Total Users</p>
            </div>
            <div className="stat-item">
              <h2>{dashboardData.totalAuctions}</h2>
              <p>Total Auction</p>
            </div>
            <div className="stat-item">
              <h2>{dashboardData.ongoingAuctions}</h2>
              <p>Ongoing Auction</p>
            </div>
            <div className="stat-item">
              <h2>{dashboardData.pendingProductApprovals}</h2>
              <p>Pending Approval</p>
            </div>
            <div className="stat-item">
              <h2>{dashboardData.totalBidders}</h2>
              <p>Bidders</p>
            </div>
            <div className="stat-item">
              <h2>{dashboardData.totalSellers}</h2>
              <p>Sellers</p>
            </div>
          </div>
          
          {/* Calendar */}
      {/* <div className="calendar-section">
            <h2>Calendar</h2>
            <Calendar onChange={handleDateChange} value={calendarDate} />
            
          </div> */}

    <div className="chart-row">

       <div className="calendar-section">
        <h2>Calendar</h2>
        <div className="calendar-container">
          <Calendar onChange={handleDateChange} value={calendarDate} />
        </div>
       </div> 

        {/* Pie Chart */}
        <div className="chart-container">
          <h2>Auction Overview</h2>
          <Pie data={pieData} />
        </div>

        {/* Bar Chart */}
        <div className="chart-container">
          <h2>User and Auction Statistics</h2>
          <Bar data={barData} />
        </div>

          

      
    </div>

            {/* Bar Chart */}
            {/* <div className="chart-section">
            <h2>User and Auction Statistics</h2>
            <Bar data={barData} />
          </div> */}

          {/* Pie Chart */}
          {/* <div className="chart-section">
            <h2>Auction Overview</h2>
            <Pie data={pieData} />
          </div> */}


          {/* Add a container for the charts */}
    
        

        </div>

        
      </div>
      
    </div>
  );
};

export default Dashboard;
