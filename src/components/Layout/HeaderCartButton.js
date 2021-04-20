import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../Store/Cart-Context';

const HeaderCartButton = (props) => {
	const { items } = useContext(CartContext);
	const [animation, setAnimation] = useState(false);
	let currItem = 0;

	console.log(items);
	items.forEach((item) => {
		currItem = parseInt(currItem) + parseInt(item.amount);
		console.log(currItem);
	});

	useEffect(() => {
		if (items.length === 0) {
			console.log('start');
			return;
		}

		setAnimation(true);
		const timer = setTimeout(() => {
			setAnimation(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	const btnClasses = `${classes.button} ${animation ? classes.bump : ''}`;

	return (
		<>
			<button className={btnClasses} onClick={props.onClick}>
				<span className={classes.icon}>
					<CartIcon />
				</span>
				<span>Your Cart</span>
				<span className={classes.badge}>{currItem}</span>
			</button>
		</>
	);
};

export default HeaderCartButton;
