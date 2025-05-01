import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";

import Subtitle from "../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import Newsletter from "../shared/Newsletter";
const Home = () => {
  
  return (
    <>
      {/* hero section  */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero_content">
                <div className="hero_subtitle d-flex align-items-center">
                  <Subtitle subtitle={"know before you go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  {" "}
                  Traveling opens the door to creating{" "}
                  <span className="highlight">memories</span>
                </h1>
                <p>
                  Discover the World with Our Expertly Crafted Tours
                </p>
                <p>
                  Embark on unforgettable journeys with our carefully curated tours. From breathtaking landscapes to cultural experiences, we create memories that last a lifetime. Our expert guides ensure you get the most out of every destination.
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box hero_video-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* herosection ebd  */}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services_subtitle">What we serve</h5>
              <h2 className="services_title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>
      {/* feature tour section start  */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured_tour-title">Our Featured tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* feature tour section end  */}
      {/* experience section start  */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience_content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                  Why Choose Our Tours?
                </p>
                <p>
                  We pride ourselves on offering unique travel experiences that go beyond the ordinary. With small group sizes, local expertise, and sustainable practices, we ensure every tour is both memorable and responsible. Join us to explore the world's wonders in comfort and style.
                </p>
              </div>

              <div className="counter_wrapper d-flex align-items-center gap-5">
                <div className="counter_box">
                  <span>12K+</span>
                  <h6>Successful Trip</h6>
                </div>
                <div className="counter_box">
                  <span>2K+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter_box">
                  <span>15</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience_img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* experience section end  */}

      {/* gallery section satart  */}

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery_title">
                Visit our customers tour gallery
              </h2>
            </Col>
            <Col lg="12">
            <MasonryImagesGallery/>
            </Col>
          </Row>
        </Container>
      </section>
      {/* gallery section end  */}

      {/* testimonual section start  */}

      <section>
        <Container>
          <Row>
            <Col lg="12">
            <Subtitle subtitle={"Fans Love"}/>
            <h2 className="testmonial_title">What our fans say about us</h2>
            </Col>
            <Col lg="12">
            <Testimonials/>
            </Col>
          </Row>
        </Container>
      </section>
      {/* testimonual section  end */}
      <Newsletter/>
    </>
  );
};

export default Home;
