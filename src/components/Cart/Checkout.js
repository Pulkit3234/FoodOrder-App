import React, { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
	const [valid, setValid] = useState(true);

	const inputName = useRef();
	const inputStreet = useRef();
	const inputPostal = useRef();
	const inputCity = useRef();

	const isEmpty = (value) => value.trim().length === 0;

	const formSubmitHandler = (e) => {
		e.preventDefault();
		const enteredName = inputName.current.value;
		const enteredStreet = inputStreet.current.value;
		const enteredPostal = inputPostal.current.value;
		const enteredCity = inputCity.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredPostalIsValid = !isEmpty(enteredPostal);
		const enteredCityIsValid = !isEmpty(enteredCity);

		const formValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;
		if (!formValid) {
			return;
		}

		props.onConfirm({ name: enteredName, street: enteredStreet, postal: enteredPostal, city: enteredCity });
	};
	return (
		<form onSubmit={formSubmitHandler} className={classes.form}>
			<div className={classes.control}>
				<label htmlFor="name">Your Name</label>
				<input id="name" type="text" ref={inputName} />
			</div>
			<div className={classes.control}>
				<label htmlFor="street">Street</label>
				<input id="street" type="text" ref={inputStreet} />
			</div>
			<div className={classes.control}>
				<label htmlFor="postal">Postal Code</label>
				<input id="postal" type="text" ref={inputPostal} />
			</div>
			<div className={classes.control}>
				<label htmlFor="postal">City</label>
				<input id="postal" type="text" ref={inputCity} />
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onClose}>
					Cancel
				</button>
				<button type="submit">Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
