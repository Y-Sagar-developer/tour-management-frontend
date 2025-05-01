import tourImg01 from "../images/tour-img01.jpg";
import tourImg02 from "../images/tour-img02.jpg";
import tourImg03 from "../images/tour-img03.jpg";
import tourImg04 from "../images/tour-img04.jpg";
import tourImg05 from "../images/tour-img05.jpg";
import tourImg06 from "../images/tour-img06.jpg";
import tourImg07 from "../images/tour-img07.jpg";

export const tours = [
  {
    id: "01",
    title: "Westminister Bridge",
    city: "London",
    address: "Westminster, London SW1A 2JR, UK",
    distance: 300,
    price: 89999,
    maxGroupSize: 10,
    desc: "Iconic bridge offering stunning views of the London skyline and the Houses of Parliament",
    reviews: [
      {
        name: "John Smith",
        rating: 4.8,
        comment: "Amazing views of the city!"
      },
      {
        name: "Emma Wilson",
        rating: 4.5,
        comment: "Great photo opportunities"
      }
    ],
    avgRating: 4.65,
    photo: tourImg01,
    featured: true,
  },
  {
    id: "02",
    title: "Bali, Indonesia",
    city: "Bali",
    address: "Ubud, Bali, Indonesia",
    distance: 400,
    price: 45999,
    maxGroupSize: 8,
    desc: "Experience the rich culture and beautiful landscapes of Bali's most famous destinations",
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 4.9,
        comment: "Absolutely breathtaking!"
      }
    ],
    avgRating: 4.9,
    photo: tourImg02,
    featured: true,
  },
  {
    id: "03",
    title: "Snowy Mountains, Thailand",
    city: "Bangkok",
    address: "Doi Inthanon, Chiang Mai, Thailand",
    distance: 500,
    price: 35999,
    maxGroupSize: 8,
    desc: "Explore the highest peak in Thailand with its stunning mountain views and unique flora",
    reviews: [
      {
        name: "Michael Brown",
        rating: 4.7,
        comment: "Unforgettable experience"
      }
    ],
    avgRating: 4.7,
    photo: tourImg03,
    featured: true,
  },
  {
    id: "04",
    title: "Beautiful Sunrise, Thailand",
    city: "Phuket",
    address: "Phang Nga Bay, Phuket, Thailand",
    distance: 500,
    price: 32999,
    maxGroupSize: 8,
    desc: "Witness the magical sunrise over the Andaman Sea from Phuket's best viewpoints",
    reviews: [
      {
        name: "Lisa Chen",
        rating: 4.6,
        comment: "Worth waking up early for!"
      }
    ],
    avgRating: 4.6,
    photo: tourImg04,
    featured: true,
  },
  {
    id: "05",
    title: "Nusa Pendia Bali, Indonesia",
    city: "Bali",
    address: "Nusa Penida, Bali, Indonesia",
    distance: 500,
    price: 48999,
    maxGroupSize: 8,
    desc: "Discover the hidden gems of Nusa Penida with its pristine beaches and dramatic cliffs",
    reviews: [
      {
        name: "David Wilson",
        rating: 4.8,
        comment: "Paradise on earth"
      }
    ],
    avgRating: 4.8,
    photo: tourImg05,
    featured: true,
  },
  {
    id: "06",
    title: "Cherry Blossoms Spring",
    city: "Tokyo",
    address: "Ueno Park, Tokyo, Japan",
    distance: 500,
    price: 78999,
    maxGroupSize: 8,
    desc: "Experience the magical cherry blossom season in Tokyo's most famous parks",
    reviews: [
      {
        name: "Yuki Tanaka",
        rating: 4.9,
        comment: "Magical experience"
      }
    ],
    avgRating: 4.9,
    photo: tourImg06,
    featured: true,
  },
  {
    id: "07",
    title: "Holmen Lofoten, France",
    city: "Paris",
    address: "Eiffel Tower, Paris, France",
    distance: 500,
    price: 85999,
    maxGroupSize: 8,
    desc: "Explore the romantic city of Paris with its iconic landmarks and charming streets",
    reviews: [
      {
        name: "Sophie Martin",
        rating: 4.7,
        comment: "Perfect for couples"
      }
    ],
    avgRating: 4.7,
    photo: tourImg07,
    featured: true,
  },
  {
    id: "08",
    title: "Beautiful Snowy Mountains",
    city: "Bangkok",
    address: "Doi Suthep, Chiang Mai, Thailand",
    distance: 500,
    price: 36999,
    maxGroupSize: 8,
    desc: "Experience the beauty of Thailand's northern mountains and their unique culture",
    reviews: [
      {
        name: "James Wilson",
        rating: 4.6,
        comment: "Amazing mountain views"
      }
    ],
    avgRating: 4.6,
    photo: tourImg01,
    featured: true,
  },
  {
    id: "09",
    title: "Jaflong, Sylhet",
    city: "Sylhet",
    address: "Jaflong, Sylhet, Bangladesh",
    distance: 100,
    price: 28999,
    maxGroupSize: 5,
    desc: "Explore the natural beauty of Jaflong with its crystal clear water and tea gardens",
    reviews: [
      {
        name: "Rahman Khan",
        rating: 4.5,
        comment: "Beautiful place to visit"
      }
    ],
    avgRating: 4.5,
    photo: tourImg02,
    featured: false,
  },
  {
    id: "10",
    title: "Cox's Bazar Sea Beach",
    city: "Chittagong",
    address: "Cox's Bazar, Chittagong, Bangladesh",
    distance: 500,
    price: 25999,
    maxGroupSize: 8,
    desc: "Experience the world's longest natural sea beach with its golden sands and clear waters",
    reviews: [
      {
        name: "Fatima Ahmed",
        rating: 4.7,
        comment: "Perfect beach destination"
      }
    ],
    avgRating: 4.7,
    photo: tourImg03,
    featured: false,
  },
  {
    id: "11",
    title: "Baga Beach, Goa",
    city: "Goa",
    address: "Baga Beach, North Goa, India",
    distance: 305,
    price: 12999,
    maxGroupSize: 6,
    desc: "Experience the vibrant nightlife and beautiful beaches of Goa's most famous destination",
    reviews: [
      {
        name: "Rajesh Kumar",
        rating: 4.6,
        comment: "Amazing beach experience"
      }
    ],
    avgRating: 4.6,
    photo: tourImg04,
    featured: false,
  },
  {
    id: "12",
    title: "Anjuna Beach, Goa",
    city: "Goa",
    address: "Anjuna Beach, North Goa, India",
    distance: 124,
    price: 14999,
    maxGroupSize: 8,
    desc: "Discover the famous flea market and beautiful sunset views at Anjuna Beach",
    reviews: [
      {
        name: "Priya Sharma",
        rating: 4.8,
        comment: "Great shopping and beach experience"
      }
    ],
    avgRating: 4.8,
    photo: tourImg05,
    featured: false,
  },
  {
    id: "13",
    title: "Fort Aguada, Goa",
    city: "Goa",
    address: "Fort Aguada, North Goa, India",
    distance: 225,
    price: 11999,
    maxGroupSize: 9,
    desc: "Explore the historic Portuguese fort with stunning views of the Arabian Sea",
    reviews: [
      {
        name: "Amit Patel",
        rating: 4.7,
        comment: "Rich history and beautiful views"
      }
    ],
    avgRating: 4.7,
    photo: tourImg06,
    featured: false,
  },
  {
    id: "14",
    title: "Dudhsagar Falls, Goa",
    city: "Goa",
    address: "Dudhsagar Falls, Goa, India",
    distance: 494,
    price: 9999,
    maxGroupSize: 6,
    desc: "Witness the majestic Dudhsagar Falls, one of India's tallest waterfalls",
    reviews: [
      {
        name: "Sneha Reddy",
        rating: 4.9,
        comment: "Breathtaking waterfall experience"
      }
    ],
    avgRating: 4.9,
    photo: tourImg07,
    featured: false,
  },
  {
    id: "15",
    title: "Alleppey Backwaters, Kerala",
    city: "Kerala",
    address: "Alleppey Backwaters, Kerala, India",
    distance: 510,
    price: 15999,
    maxGroupSize: 10,
    desc: "Experience the serene backwaters of Kerala on a traditional houseboat",
    reviews: [
      {
        name: "Arun Nair",
        rating: 4.8,
        comment: "Peaceful and beautiful experience"
      }
    ],
    avgRating: 4.8,
    photo: tourImg01,
    featured: true,
  },
  {
    id: "16",
    title: "Munnar Hills, Kerala",
    city: "Kerala",
    address: "Munnar, Kerala, India",
    distance: 361,
    price: 12499,
    maxGroupSize: 5,
    desc: "Explore the tea plantations and misty hills of Munnar",
    reviews: [
      {
        name: "Meera Krishnan",
        rating: 4.7,
        comment: "Beautiful tea gardens and cool climate"
      }
    ],
    avgRating: 4.7,
    photo: tourImg02,
    featured: false,
  },
  {
    id: "17",
    title: "Kochi Fort, Kerala",
    city: "Kerala",
    address: "Fort Kochi, Kerala, India",
    distance: 111,
    price: 8999,
    maxGroupSize: 8,
    desc: "Discover the historic Fort Kochi with its colonial architecture and Chinese fishing nets",
    reviews: [
      {
        name: "Vijay Menon",
        rating: 4.6,
        comment: "Rich cultural experience"
      }
    ],
    avgRating: 4.6,
    photo: tourImg03,
    featured: true,
  },
  {
    id: "18",
    title: "Wayanad Forest, Kerala",
    city: "Kerala",
    address: "Wayanad, Kerala, India",
    distance: 216,
    price: 11499,
    maxGroupSize: 10,
    desc: "Explore the lush forests and wildlife of Wayanad",
    reviews: [
      {
        name: "Deepak Kumar",
        rating: 4.8,
        comment: "Great for nature lovers"
      }
    ],
    avgRating: 4.8,
    photo: tourImg04,
    featured: true,
  },
  {
    id: "19",
    title: "Kedarnath Temple, Kedarnath",
    city: "Kedarnath",
    address: "Kedarnath Temple, Uttarakhand, India",
    distance: 510,
    price: 18999,
    maxGroupSize: 5,
    desc: "Visit the sacred Kedarnath Temple, one of the Char Dham pilgrimage sites",
    reviews: [
      {
        name: "Ravi Sharma",
        rating: 4.9,
        comment: "Spiritual and peaceful experience"
      }
    ],
    avgRating: 4.9,
    photo: tourImg05,
    featured: false,
  },
  {
    id: "20",
    title: "Gaurikund, Kedarnath",
    city: "Kedarnath",
    address: "Gaurikund, Uttarakhand, India",
    distance: 379,
    price: 16999,
    maxGroupSize: 9,
    desc: "Start your Kedarnath journey from the sacred hot springs of Gaurikund",
    reviews: [
      {
        name: "Anita Singh",
        rating: 4.7,
        comment: "Beautiful starting point for the trek"
      }
    ],
    avgRating: 4.7,
    photo: tourImg06,
    featured: true,
  },
  {
    id: "21",
    title: "Vasuki Tal, Kedarnath",
    city: "Kedarnath",
    address: "Vasuki Tal, Uttarakhand, India",
    distance: 399,
    price: 17999,
    maxGroupSize: 7,
    desc: "Trek to the beautiful Vasuki Tal lake with stunning mountain views",
    reviews: [
      {
        name: "Sanjay Verma",
        rating: 4.8,
        comment: "Challenging but rewarding trek"
      }
    ],
    avgRating: 4.8,
    photo: tourImg07,
    featured: true,
  },
  {
    id: "22",
    title: "Jaipur Palace, Rajasthan",
    city: "Rajasthan",
    address: "City Palace, Jaipur, Rajasthan, India",
    distance: 592,
    price: 13999,
    maxGroupSize: 5,
    desc: "Explore the magnificent City Palace of Jaipur with its rich history",
    reviews: [
      {
        name: "Kavita Singh",
        rating: 4.7,
        comment: "Beautiful architecture and history"
      }
    ],
    avgRating: 4.7,
    photo: tourImg01,
    featured: false,
  },
  {
    id: "23",
    title: "Udaipur Lake, Rajasthan",
    city: "Rajasthan",
    address: "Lake Pichola, Udaipur, Rajasthan, India",
    distance: 201,
    price: 14999,
    maxGroupSize: 10,
    desc: "Experience the romantic Lake Pichola with its beautiful palaces",
    reviews: [
      {
        name: "Rahul Mehta",
        rating: 4.9,
        comment: "Romantic boat ride experience"
      }
    ],
    avgRating: 4.9,
    photo: tourImg02,
    featured: true,
  },
  {
    id: "24",
    title: "Jaisalmer Fort, Rajasthan",
    city: "Rajasthan",
    address: "Jaisalmer Fort, Rajasthan, India",
    distance: 289,
    price: 12999,
    maxGroupSize: 5,
    desc: "Explore the golden fort of Jaisalmer, a UNESCO World Heritage Site",
    reviews: [
      {
        name: "Neha Gupta",
        rating: 4.8,
        comment: "Amazing desert architecture"
      }
    ],
    avgRating: 4.8,
    photo: tourImg03,
    featured: false,
  },
  {
    id: "25",
    title: "Pushkar Fair, Rajasthan",
    city: "Rajasthan",
    address: "Pushkar Fair, Rajasthan, India",
    distance: 416,
    price: 11999,
    maxGroupSize: 10,
    desc: "Experience the vibrant Pushkar Camel Fair and cultural festival",
    reviews: [
      {
        name: "Vikram Singh",
        rating: 4.7,
        comment: "Unique cultural experience"
      }
    ],
    avgRating: 4.7,
    photo: tourImg04,
    featured: true,
  },
  {
    id: "26",
    title: "Manali Valley, Himachal",
    city: "Himachal",
    address: "Manali, Himachal Pradesh, India",
    distance: 425,
    price: 13499,
    maxGroupSize: 9,
    desc: "Explore the beautiful valleys and adventure sports in Manali",
    reviews: [
      {
        name: "Rohit Sharma",
        rating: 4.8,
        comment: "Great for adventure lovers"
      }
    ],
    avgRating: 4.8,
    photo: tourImg05,
    featured: false,
  },
  {
    id: "27",
    title: "Shimla Ridge, Himachal",
    city: "Himachal",
    address: "The Ridge, Shimla, Himachal Pradesh, India",
    distance: 109,
    price: 12499,
    maxGroupSize: 8,
    desc: "Experience the colonial charm of Shimla's famous Ridge",
    reviews: [
      {
        name: "Priyanka Kapoor",
        rating: 4.6,
        comment: "Beautiful colonial architecture"
      }
    ],
    avgRating: 4.6,
    photo: tourImg06,
    featured: false,
  }
];

export default tours;
