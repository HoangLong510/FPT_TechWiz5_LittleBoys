import React, { useEffect, useState } from 'react';
import { GalleryData } from './GalleryData';
import Slider from "react-slick";
import "./Gallery.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Gallery() {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(GalleryData);
    }, []);

    const sliderSettings = {
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className='Gallery'>
            <div className='gallerywrapper'>
                <div className='gallerycontainer'>
                    <Slider {...sliderSettings}>
                        {
                            data.map((item) =>
                                <div className='galleryitem' key={item.id}>
                                    <img src={item.image} alt={item.title} />
                                    <div className="overlay-text">{item.title}</div>
                                </div>
                            )
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
}
