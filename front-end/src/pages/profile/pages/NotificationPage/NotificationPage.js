import React, { useEffect, useState } from 'react';
import ProfileNavbar from '../../components/ProfileNavbark';  // Navbar component
import ProfileSidebar from '../../components/ProfileSidebar'; // Sidebar component
import styles from './NotificationPage.module.css';  // CSS module for styling

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications data from the backend
    fetch('https://api.example.com/notifications')  // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setNotifications(data))
      .catch(error => console.error('Error fetching notifications:', error));
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      <div className={styles.contentWrapper}>
        <h1>Notifications</h1>
        {/* {notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          <div className={styles.notificationList}>
            {notifications.map(notification => (
              <div className={styles.notificationCard} key={notification.id}>
                <h3 className={styles.notificationTitle}>{notification.title}</h3>
                <p className={styles.notificationMessage}>{notification.message}</p>
                <p className={styles.notificationTime}>
                  {new Date(notification.time).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default NotificationPage;
