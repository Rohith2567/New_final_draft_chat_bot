import React from 'react';

import './Banner.css';
import Arrow from '../assets/Arrow';

function Banner() {
    return (
        <>
            <hr className='hr-s'></hr>
            <div className="bannerParentDiv">
                <div className="bannerChildDiv">
                    <div className="menuBar">
                        <div className="categoryMenu">
                            <span>ALL CATEGORIES</span>
                        </div>
                        <div className='arrow'><Arrow /></div>
                        <div className="otherQuickOptions">
                            <span>Cars</span>
                            <span>Motorcyles</span>
                            <span>Mobile Phones</span>
                            <span>For Sale:Houses & Apartments</span>
                            <span>Scooters</span>
                            <span>Commercial & Other Vehicles</span>
                            <span>For Rent: House & Apartments</span>
                        </div>
                    </div>
                </div>
                <div className="banner">
                    <div className='jj'></div>
                    <div className='bg-img'></div>
                </div>
            </div>
        </>
    );
}

export default Banner;