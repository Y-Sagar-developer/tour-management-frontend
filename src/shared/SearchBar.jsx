import React, { useRef, useState, useEffect } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup, Input } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SearchBar = () => {
  const locationRef = useRef("");
  const maxGroupSizeRef = useRef("");
  const [locations, setLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available tour locations when component mounts
    const fetchLocations = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tours`);
        if (!res.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await res.json();
        // Extract unique cities from tours
        const uniqueLocations = [...new Set(data.data.map(tour => tour.city))].sort();
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();

    // Add click outside listener to close dropdown
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search_input-wrapper')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const searchHandler = async () => {
    const location = locationRef.current.value.trim();
    const maxGroupSize = maxGroupSizeRef.current.value;
  
    if (!maxGroupSize) {
      toast.warning("Group size is required");
      return;
    }
  
    let searchUrl = `${BASE_URL}/tours/search/getTourBySearch?maxGroupSize=${maxGroupSize}`;
    
    // Only add city to URL if it's provided
    if (location) {
      const formattedLocation = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();
      searchUrl = `${searchUrl}&city=${formattedLocation}`;
    }
  
    try {
      const res = await fetch(searchUrl);
      
      if (!res.ok) {
        console.error('Search failed:', res.status, res.statusText);
        toast.error("Something went wrong");
        return;
      }
  
      const result = await res.json();
      console.log('Search results:', result.data);
  
      navigate(`/tours/search`, { state: result.data });
    } catch (error) {
      console.error('Search error:', error);
      toast.error("Failed to search tours. Please try again.");
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    locationRef.current.value = value;
  };

  const handleLocationSelect = (location) => {
    locationRef.current.value = location;
    setSearchTerm(location);
    setShowDropdown(false);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const filteredLocations = searchTerm
    ? locations.filter(location =>
        location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : locations;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        searchHandler();
      } catch (error) {
        console.error("Error searching tours:", error);
        toast.error("Failed to search tours. Please try again.");
      }
    }
  };

  return ( 
    <Col lg="12">
      <div className="search_bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form_group form_group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div className="search_input-wrapper">
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
                value={searchTerm}
                onChange={handleLocationChange}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              {showDropdown && (
                <div className="location_dropdown">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((location, index) => (
                      <div
                        key={index}
                        className="location_dropdown-item"
                        onClick={() => handleLocationSelect(location)}
                      >
                        <i className="ri-map-pin-line"></i>
                        {location}
                      </div>
                    ))
                  ) : (
                    <div className="location_dropdown-item no-results">
                      <i className="ri-information-line"></i>
                      No locations found
                    </div>
                  )}
                </div>
              )}
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form_group form_group-last">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} onKeyDown={handleKeyDown} />
            </div>
          </FormGroup>
          <span className="search_icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
