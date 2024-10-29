
import React, { useState } from 'react';
import './VintageTimepiecesGallery.css';

const timepieces = [
    {
        title: "Art Deco Wristwatch",
        description: "Stylish art deco design with geometric patterns and silver finish",
        price: "Starting from $400",
        image: "Leonardo_Phoenix_A_highly_detailed_3D_realistic_illustration_o_0.jpg"
    },

    {
        title: "Vintage Rose Timepiece",
        description: "Elegant vintage pocket watch with delicate Roman numerals and gold accents",
        price: "Starting from $350",
        image: "Leonardo_Phoenix_Elegant_vintage_pocket_watch_with_delicate_Ro_0.jpg"
    },
    {
        title: "Antique Chronograph",
        description: "Precision chronograph with intricate detailing and leather strap",
        price: "Starting from $450",
        image: "Leonardo_Phoenix_Highly_detailed_3D_realistic_antique_chronogr_0.jpg"
    },
   
];

const VintageTimepiecesGallery = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const showDetail = (index) => {
        setSelectedIndex(index);
    };

    const exploreItem = () => {
        alert('Exploring item...');
    };

    const viewSimilarItems = () => {
        alert('Viewing similar items...');
    };

    const selectedPiece = timepieces[selectedIndex];

    return (
        <div className="containera">
            <div className="detail-view" style={{backgroundImage: `url('${selectedPiece.image}')`}}>
                <div className="overlay"></div>
                <div className="price">{selectedPiece.price}</div>
                <div className="detail-content">
                    <h1>{selectedPiece.title}</h1>
                    <p>{selectedPiece.description}</p>
                    <div className="buttons">
                        <button onClick={exploreItem}>Explore</button>
                        <button onClick={viewSimilarItems}>Similar Items</button>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {timepieces.map((piece, index) => (
                    <div
                        key={index}
                        className={`card ${index === selectedIndex ? 'active' : ''}`}
                        style={{backgroundImage: `url('${piece.image}')`}}
                        onClick={() => showDetail(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default VintageTimepiecesGallery;