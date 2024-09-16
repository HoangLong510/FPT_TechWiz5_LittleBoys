import React, { useEffect, useState } from 'react';
import { GalleryData } from './GalleryData';
import "./Gallery.css";

export default function Gallery() {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(GalleryData);
    }, []);

    return (
        <div className='Gallery '>
            <div className='gallerywrapper'>
                <div className='gallerycontainer'>
                    {
                        data.map((item, index) =>
                            <div className='galleryitem' key={index}>
                                <img src={item.image} alt={item.title} />
                                <div className="overlay-text">{item.title}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
