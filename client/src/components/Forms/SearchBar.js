import React, { useEffect, useState } from "react";
import { clearListings, getListings } from "../../actions/listing";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const SearchBar = ({ getListings, clearListing, listings }) => {
	const [formData, setFormData] = useState({
		query: "",
		category: "All Categories",
	});

	let { query, category } = formData;
	let history = useHistory();

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		clearListings();
		let search = "";
		if (query) {
			search = "?search=" + query.split(" ").join("+");
		}
		if (category !== "" && category !== "All Categories") {
			query === ""
				? (search = "?category=" + category)
				: (search = search + "&category=" + category);
		}
		search === ""
			? (search = `?limit=${10}&page=${1}`)
			: (search = search + `&limit=${10}&page=${1}`);

		history.push(`/listings${search}`);
		getListings(search);
	};

	const categoryList = getUniqueCategories(listings.data);

	function getUniqueCategories(listings) {
		const categories = [];

		if (listings !== null) {
			listings.forEach((item) => {
				if (!categories.includes(item.category)) {
					categories.push(item.category);
				}
			});
			console.log("listing is not null", listings)
		}

		return categories;
	}

	useEffect(() => {
		console.log(categoryList);
	}, [listings]);

	return (
		<form onSubmit={(e) => onSubmit(e)}>
			<select onChange={(e) => onChange(e)} name="category" value={category}>
				<option value="All Categories">All Categories</option>
				{categoryList.map(category => {
					return <option value={category} key={category}>{category}</option>
				})}
			</select>
			<input
				type="text"
				placeholder="Enter a search"
				name="query"
				value={query}
				onChange={(e) => onChange(e)}
			/>
			<input type="submit" className="btn btn-primary" value="Search" />
		</form>
	);
};

const mapStateToProps = (state) => ({
	listings: state.listings,
});

export default connect(mapStateToProps, { getListings, clearListings })(
	SearchBar
);
