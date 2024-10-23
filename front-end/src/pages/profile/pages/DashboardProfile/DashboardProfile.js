import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ProfileNavbar from '../../components/ProfileNavbark';  
import ProfileSidebar from '../../components/ProfileSidebar'; 
import styles from './ProfileDashboard.module.css'; 


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProfileDashboard = () => {
  const [stats, setStats] = useState({
    auctions: 0,
    bids: 0,
    products: 0,
    earnings: 0,
  });

  useEffect(() => {
   
    const dummyStats = {
      auctions: 10,
      bids: 25,
      products: 18,
      earnings: 120,  
    };
    setStats(dummyStats);
  }, []);

  const barData = {
    labels: ['Auctions', 'Bids', 'Products', 'Earnings'],
    datasets: [
      {
        label: 'Profile Statistics',
        data: [stats.auctions, stats.bids, stats.products, stats.earnings],
        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
        borderColor: ['#0056b3', '#218838', '#e0a800', '#c82333'],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Profile Statistics Overview' },
    },
  };

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      <div className={styles.contentWrapper}>
        <h1>Profile Dashboard</h1>
        <div className={styles.statsCards}>
          <div className={styles.card}>
            <h2>Auctions</h2>
            <p>{stats.auctions}</p>
          </div>
          <div className={styles.card}>
            <h2>Bids</h2>
            <p>{stats.bids}</p>
          </div>
          <div className={styles.card}>
            <h2>Products</h2>
            <p>{stats.products}</p>
          </div>
          <div className={styles.card}>
            <h2>Earnings</h2>
            <p>${stats.earnings}</p>
          </div>
        </div>
        <div className={styles.chartContainer}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
