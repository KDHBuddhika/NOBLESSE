import React, { useState, useEffect } from 'react';
import ProfileNavbar from '../../components/ProfileNavbark';  
import ProfileSidebar from '../../components/ProfileSidebar'; 
import styles from './WatchList.module.css';  

const WatchList = () => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    
    const dummyData = [
      {
        id: 1,
        name: 'Vintage Watch',
        imageUrl: require("../../../../assets/watchlist/vintege watch.jpg"),
        price: 250,
        status: 'Available',
      },
      {
        id: 2,
        name: 'Antique Vase',
        imageUrl: require("../../../../assets/watchlist/Antique Vase.jpeg"),
        price: 500,
        status: 'Bidding Soon',
      },
      {
        id: 3,
        name: 'Luxury Handbag',
        imageUrl: require("../../../../assets/watchlist/Luxury Handbag.jpg"),
        price: 1200,
        status: 'Out of Stock',
      },
    ];

    setWatchList(dummyData);  
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      <div className={styles.contentWrapper}>
        <h1>My Watch List</h1>
        <div className={styles.watchList}>
          {watchList.length === 0 ? (
            <p>No items in your watch list.</p>
          ) : (
            watchList.map((item) => (
              <div className={styles.watchCard} key={item.id}>
                <img src={item.imageUrl} alt={item.name} className={styles.watchImage} />
                <div className={styles.watchDetails}>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Status: {item.status}</p>
                  <button className={styles.removeBtn}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchList;
