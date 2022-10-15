import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './tourpage.css';
import axios from 'axios';

const Tourpage = () => {
  const [tour, settour] = useState();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { user, tours, isError, isSuccess, isLoading, message } = useSelector(
  //   (state) => state.auth
  // );
  const { user } = useSelector((state) => state.auth);
  const getTour = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/tours');
      if (response.data) {
        // localStorage.setItem('tours', JSON.stringify(response.data));
        settour(response.data.tours);

        // console.log(response.data.tours);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (user) {
      getTour();
    }
  }, []);

  if (user && tour) {
    return (
      <div className="banner_container">
        <div className="banner">
          {' '}
          {tour.map((tour, index) => {
            return (
              <div className="wrapper" key={index}>
                <div className="img_cover_and_name">
                  <img src={`${tour.imageCover}`} alt={tour.name} />{' '}
                  <h2> {tour.name} </h2>{' '}
                </div>{' '}
                <div className="price_and_summary">
                  <span className="price_class">
                    {' '}
                    {`${tour.difficulty} ${tour.duration}-day tour`}{' '}
                  </span>{' '}
                  <p id="summary_id"> {tour.summary} </p>{' '}
                </div>{' '}
                <div id="tour_detail_id">
                  <div>
                    <span> Stopage </span>{' '}
                    <h3> {tour.maxGroupSize} - people </h3>{' '}
                  </div>{' '}
                  <div>
                    <span> Location </span> <h3> {Date.now()} </h3>
                  </div>
                </div>{' '}
                <div className="details">
                  <div id="price_and_rating">
                    <span>
                      {' '}
                      {tour.price}
                      Rs / per person
                    </span>
                    <h3>
                      {tour.ratingAverage}
                      rating
                    </h3>
                  </div>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        const response = await axios.get(
                          `http://localhost:8000/tour/${tour.slug}`
                        );
                        if (response) {
                          // console.log(response);

                          localStorage.setItem(
                            'tourdetail',
                            JSON.stringify(response.data)
                          );
                          navigate('/tourdetail');
                        }
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    Details{' '}
                  </button>{' '}
                </div>{' '}
              </div>
            );
          })}{' '}
        </div>{' '}
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <h1> you are not login Please Login to Book your Tour </h1>{' '}
      </>
    );
  }
};

export default Tourpage;
