import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    text: "The tour exceeded all my expectations! The guides were knowledgeable, the itinerary was well-planned, and the experiences were unforgettable. I'll definitely be booking another tour soon.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    text: "As a solo traveler, I was initially hesitant, but this tour made me feel completely at ease. The group was friendly, and the activities were perfectly balanced between adventure and relaxation.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    text: "The attention to detail in this tour was impressive. From the comfortable accommodations to the local cuisine experiences, everything was thoughtfully arranged. A truly memorable journey!",
    rating: 5
  },
  {
    id: 4,
    name: "David Wilson",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    text: "This was my third tour with this company, and they never disappoint. The local guides provide unique insights you wouldn't get otherwise. Highly recommended for any travel enthusiast!",
    rating: 5
  }
];

const Testimonials = () => {
  const settings ={
    dots:true,
    isFinite:true,
    autoplay:true,
    speed:1000,
    swipeToSlide:true,
    autoplaySpeed:2000,
    slidesToShow:3,
    responsive:[
      {
        breakpoint:992,
        settings:{
          slidesToShow:2,
          slideToScroll:1,
          isFinite:true,
          dots:true,
        },
      },
      {
        breakpoint:576,
        settings:{
          slidesToShow:1,
          slideToScroll:1,
        }
      }

    ]

  }
  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          {testimonials[0].text}
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={testimonials[0].photo} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">{testimonials[0].name}</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          {testimonials[1].text}
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={testimonials[1].photo} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">{testimonials[1].name}</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          {testimonials[2].text}
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={testimonials[2].photo} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">{testimonials[2].name}</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          {testimonials[3].text}
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={testimonials[3].photo} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">{testimonials[3].name}</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonials;
