import {useContext} from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../Store/Cart-Context';

const MealItem = (props) => {
	const price = `$${props.price.toFixed(2)}`;
	const {addItem} = useContext(CartContext);
	

	const addToCartHandler = (amount) => {
		console.log('amount', amount);
		console.log(props.id)
		addItem({
			id : props.id,
			name : props.name,
			amount,
			price : props.price


		});

	};

	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.name}</h3>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm addToCart={addToCartHandler}/>
			</div>
		</li>
	);
};

export default MealItem;
