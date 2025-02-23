import "react-datepicker/dist/react-datepicker.css";

import React, { Fragment, useState } from "react";

import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet";
import ImageUploader from "react-images-upload";
import axios from "axios";
import { connect } from "react-redux";
import { createListing } from "../../actions/listing";

const CreateListingPage = ({ createListing, history, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    minIncrement: "",
    category: "",
    length: "",
    condition: "used",
    startPrice: "",
  });

  let { title, description, minIncrement, category, condition, startPrice } =
    formData;

  const [pictures, setPictures] = useState([]);

  const [endDate, setEndDate] = useState(new Date());

  const [uploading, setUploading] = useState(false);

  const onDrop = (picture) => {
    setPictures([...pictures, picture]);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
      let img;
      if (pictures[0]) {
        let formData = new FormData();
        formData.append("image", pictures[0][0]);
        img = (await axios.post("/api/listings/upload/image", formData)).data
          .url;
      }
      createListing(
        title,
        description,
        minIncrement,
        category,
        endDate,
        condition,
        startPrice,
        img,
        history
      );
    setUploading(false);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Create Listing | Auction</title>
      </Helmet>
      <div className="row">
        <form
          className="form"
          encType="multipart/form-data"
          onSubmit={(e) => onSubmit(e)}
        >
          <h2 className="large-heading">Create Listing</h2>
          <p className="small-text">Put an item up for auction</p>
          <div className="form-group">
            <h4 className="medium-heading">Item name*</h4>
            <input
              type="text"
              placeholder="Required"
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <h4 className="medium-heading">Item description*</h4>
            <textarea
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <h4 className="medium-heading">Item category*</h4>
            <input
              type="text"
              placeholder="Required"
              name="category"
              value={category}
              onChange={(e) => onChange(e)}
              required
            />

            <select
              onChange={(e) => onChange(e)}
              name="category"
              value={condition}
              required
            >
              <option value="jungle">Jungle</option>
              <option value="galaxy">Galaxy</option>
              <option value="beach">Beach</option>
            </select>
          </div>
          <div className="form-group">
            <h4 className="medium-heading">Minimum bid increment</h4>
            <input
              type="number"
              placeholder="Minimum Increment"
              name="minIncrement"
              value={minIncrement}
              step="0.01"
              onChange={(e) => {
                if (
                  /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/.test(e.target.value) ||
                  e.target.value === ""
                ) {
                  setFormData({ ...formData, minIncrement: e.target.value });
                }
              }}
            />
          </div>
          <div className="form-group">
            <h4 className="medium-heading">Item starting price</h4>
            <input
              type="number"
              placeholder="Starting price"
              name="startPrice"
              value={startPrice}
              step="0.01"
              onChange={(e) => {
                if (
                  /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/.test(e.target.value) ||
                  e.target.value === ""
                ) {
                  setFormData({ ...formData, startPrice: e.target.value });
                }
              }}
            />
          </div>
          <div className="form-group">
            <h4 className="medium-heading">Item image</h4>
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              withPreview={true}
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
          </div>
          <div className="form-group">
            <h4 className="medium-heading">Item condition</h4>
            <select
              onChange={(e) => onChange(e)}
              name="condition"
              value={condition}
            >
              <option value="used">Flawless</option>
              <option value="new">Tear</option>
              <option value="new">Drip Mark</option>
              <option value="new">Painting Error</option>
            </select>
          </div>
          <div className="form-group">
            <h4 className="medium-heading">Auction end date*</h4>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              required
            />
          </div>
          <input
            type="submit"
            className="btn-gray large full"
            value={uploading ? "Creating.." : "Create listing"}
            disabled={uploading}
          />
        </form>
      </div>
    </Fragment>
  );
};

CreateListingPage.propTypes = {};

export default connect(null, { createListing })(CreateListingPage);
