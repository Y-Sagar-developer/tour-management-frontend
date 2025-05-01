import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tour-card.css";
import calculateAvgRating from "../utils/avgRating";

const TourCard = ({ tour }) => {
  const { _id, id, title, city, photo, price, featured, reviews } = tour;
  const tourId = _id || id; // Use MongoDB _id if available, otherwise use local id

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  if (!tourId) {
    console.error('No tour ID found:', tour);
    return null;
  }

  return (
    <div className="tour_card">
      <Card>
        <div className="tour_img">
          <img src={photo} alt="tour_img" />
          {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card_top d-flex align-items-center justify-content-between">
            <span className="tour_location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i>
              {city}
            </span>
            <span className="rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? (
                "Not rated"
              ) : (
                <span>({reviews?.length})</span>
              )}
            </span>
          </div>
          <h5 className="tour_title">
            <Link to={`/tours/${tourId}`}>{title}</Link>
          </h5>
          <div className="card_botton d-flex align-items-center justify-content-between mt-3">
            <h5>
              ₹{price}
              <span>/per person</span>
            </h5>
            <button className="btn booking_btn">
              <Link to={`/tours/${tourId}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;




// import React from "react";
// import { Card, CardBody } from "reactstrap";
// import { Link } from "react-router-dom";
// import "./tour-card.css";
// import calculateAvgRating from "../utils/avgRating";

// const TourCard = ({ tour }) => {
//   const { _id, title, city, photo, price, featured, reviews } = tour;

//   const { totalRating, avgRating } = calculateAvgRating(reviews);

//   return (
//     <div className="tour_card">
//       <Card>
//         <div className="tour_img">
//           <img src={photo} alt="tour_img" />
//           {featured && <span>Featured</span>}
//         </div>

//         <CardBody>
//           <div className="card_top d-flex align-items-center justify-content-between">
//             <span className="tour_location d-flex align-items-center gap-1">
//               <i className="ri-map-pin-line"></i>
//               {city}
//             </span>
//             <span className="rating d-flex align-items-center gap-1">
//               <i className="ri-star-fill"></i>
//               {totalRating === 0 ? (
//                 "Not rated"
//               ) : (
//                 <>
//                   {avgRating} <span>({reviews?.length})</span>
//                 </>
//               )}
//             </span>
//           </div>

//           <h5 className="tour_title">
//             <Link to={`/tours/${_id}`}>{title}</Link>
//           </h5>

//           <div className="card_botton d-flex align-items-center justify-content-between mt-3">
//             <h5>
//               ${price}
//               <span>/per person</span>
//             </h5>
//             <button className="btn booking_btn">
//               <Link to={`/tours/${_id}`}>Book Now</Link>
//             </button>
//           </div>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default TourCard;
