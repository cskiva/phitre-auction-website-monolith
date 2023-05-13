import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import BiddingHistoryPage from '../Dashboard/BiddingHistoryPage';
import CreateListingPage from '../Listing/CreateListingPage';
import Dashboard from '../Dashboard/Dashboard';
import EditListingPage from '../Listing/EditListingPage';
import EditProfilePage from '../Profile/EditProfilePage';
import HomePage from '../Homepage/HomePage';
import ListingPage from '../Listing/ListingPage';
import ListingsPage from '../Listings/ListingsPage';
import Login from '../Auth/LoginPage';
import PageNotFound from '../Layout/PageNotFound';
import PrivateRoute from '../Routing/PrivateRoute';
import ProfilePage from '../Profile/ProfilePage';
import Register from '../Auth/RegisterPage';
import YourListingsPage from '../Dashboard/YourListingsPage';
import YourReviewsPage from '../Dashboard/YourReviewsPage';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const Routes = ({ loadUser, dispatch }) => {
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />\
        <Route exact path='/login' component={Login} />\
        <Route exact path='/register' component={Register} />
        <Route exact path='/listings' component={ListingsPage} />
        <Route exact path='/listings/:slug' component={ListingPage} />
        <PrivateRoute exact path='/create' component={CreateListingPage} />
        <PrivateRoute
          exact
          path='/listings/:slug/edit'
          component={EditListingPage}
        />
        <Route exact path='/profile/:id' component={ProfilePage} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute
          exact
          path='/dashboard/edit'
          component={EditProfilePage}
        />
        <PrivateRoute
          exact
          path='/dashboard/listings'
          component={YourListingsPage}
        />
        <PrivateRoute
          exact
          path='/dashboard/reviews'
          component={YourReviewsPage}
        />
        <PrivateRoute
          exact
          path='/dashboard/bids'
          component={BiddingHistoryPage}
        />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default connect(null, { loadUser })(Routes);
