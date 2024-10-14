import React, { useEffect, useState } from 'react';
import Navbar from '../../components/AdminNavbar';  // Adjust path
import Sidebar from '../../components/AdminSidebar'; // Adjust path
import './Dashboard.css';
import { Pie, Bar } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
 // Import calendar styles
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js'; // Explicitly import components

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
    // Fetch data from .NET backend
    const fetchData = async () => {
      try {
        const response = await fetch('https://your-backend-api-url/dashboard');
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

  // Example Pie Chart Data (replace with actual data)
  const pieData = {
    labels: ['Approved Auctions', 'Pending Auctions', 'Completed Auctions'],
    datasets: [
      {
        // data: [dashboardData.totalAuctions - dashboardData.pendingApproval, dashboardData.pendingApproval, dashboardData.ongoingAuctions],
        // backgroundColor: ['#4CAF50', '#FFEB3B', '#FF5722'],
        data: [dashboardData.totalAuctions - 23, 45, 65],
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
            return `${label}: ${value}`; // Customize the format of the tooltip
          },
        },
      },
    },
  };


  // Example Bar Chart Data (replace with actual data)
  const barData = {
    labels: ['Users', 'Auctions', 'Bidders', 'Sellers'],
    datasets: [
      {
        label: 'Numbers',
        backgroundColor: '#1A1A54',
        data: [dashboardData.totalUsers, dashboardData.totalAuctions, dashboardData.bidders, dashboardData.sellers],
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
              <h2>{dashboardData.pendingApproval}</h2>
              <p>Pending Approval</p>
            </div>
            <div className="stat-item">
              <h2>{dashboardData.bidders}</h2>
              <p>Bidders</p>
            </div>
            <div className="stat-item">
              <h2>{dashboardData.sellers}</h2>
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
