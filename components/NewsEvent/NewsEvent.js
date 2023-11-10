import React, { useRef } from 'react';
import Carousel from 'react-slick';
import NewsCard from '../Cards/News';
import imgAPI from '~/public/images/imgAPI';
import useStyle from './news-event-style';

const newsContent = [
  {
    text: "Beachside Bonfire Nights: Join us for unforgettable evenings by the sea with cozy bonfires, live music, and delicious treats.",
    img: imgAPI.photo[1],
    type: 'caption_event',
  },
  {
    text: "Special Holiday Packages: Stay up-to-date with our latest holiday packages and promotions, designed to make your vacation even more memorable.",
    img: imgAPI.photo[2],
    type: 'caption_news',
  },
  {
    text: "Live Music & Entertainment: Enjoy the rhythm of the ocean with live music, dance performances, and entertainment that'll make your nights unforgettable.",
    img: imgAPI.photo[3],
    type: 'caption_event',
  },
  {
    text: "Guest Reviews and Testimonials: Explore what our guests have to say about their experiences at our hotel, with real testimonials and feedback.",
    img: imgAPI.photo[4],
    type: 'caption_news',
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToScroll: 1,
  responsive: [{
    breakpoint: 700,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }]
};

function NewsEvent() {
  const slider = useRef(null);
  const { classes } = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.carousel}>
        <Carousel ref={slider} {...settings}>
          {newsContent.map((item, index) => (
            <div key={index.toString()}>
              <div className={classes.item}>
                <NewsCard
                  img={item.img}
                  text={item.text}
                  type={item.type}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default NewsEvent;
