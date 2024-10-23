import React, { useEffect, useState } from 'react';
import ProfileNavbar from '../../components/ProfileNavbark';  
import ProfileSidebar from '../../components/ProfileSidebar'; 
import styles from './NotificationPage.module.css';  

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    
    fetch('https://api.example.com/notifications')  
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
