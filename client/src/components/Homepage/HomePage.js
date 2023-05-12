import React, { Fragment, useEffect, useState } from 'react';
import { clearListings, getListings } from '../../actions/listing';

import ImageGallery from 'react-image-gallery';
import ListingCard from '../Listing/ListingCard';
import Spinner from './../Layout/Spinner';
import { connect } from 'react-redux';

export const HomePage = ({ getListings, clearListings, listings }) => {
  const [imageLoadedCount, setCount] = useState(1);
  const [imagesLoading, setImagesLoading] = useState(false);
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/'
    }
  ];

  const handleImageLoad = () => {
    setCount(imageLoadedCount + 1);
    if (imageLoadedCount === 3) {
      console.log('loaded');
      setImagesLoading(false);
    }
  };

  useEffect(() => {
    getListings('?limit=5');
    return () => {
      clearListings();
    };
  }, [getListings, clearListings]);

  return listings.loading || listings.data === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {imagesLoading && <Spinner />}
      <div
        style={{ display: imagesLoading ? 'none' : 'block' }}
        className='row'
      >
		<h1>Welcome to Phi Tre</h1>
		<h2 className='large-heading'>Items</h2>
        <div className='listing-card-row'>
          {listings.data.map(listing => (
            <ListingCard id={listing._id} listing={listing} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  listings: state.listings
});

export default connect(mapStateToProps, { clearListings, getListings })(
  HomePage
);
