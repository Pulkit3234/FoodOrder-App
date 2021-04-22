import { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../Store/Cart-Context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import axios from 'axios';

const Cart = (props) => {
	const { items, totalAmount, addItem, removeItem, reset } = useContext(CartContext);
	const [showCheckout, setShowCheckout] = useState(false);
	const [error, setError] = useState(false);
	const [orderConfirm, setOrderConfirm] = useState('');
	const amount = `$${totalAmount.toFixed(2)}`;
	console.log(props);

	const submitOrderHandler = async (data) => {
		try {
			const res = await axios.post('https://newthis-be766-default-rtdb.firebaseio.com/orders.json', {
				data,
				user: items,
			});

			if (!res) {
				const error = new Error();
				error.message = 'Something Went Wrong';
				throw error;
			}

			console.log('clicked');
			console.log(res);
			setOrderConfirm('Your Order Have Been Confirmed!');
			setError(false);
			reset();
		} catch (error) {
			setOrderConfirm('');
			console.log(error);
			setError(error.message);
		}
	};

	const cartItemAddHandler = (item) => {
		addItem({ ...item, amount: 1 });
	};

	const cartItemRemoveHandler = (id) => {
		console.log(id);

		removeItem(id);
	};

	const orderHandler = (e) => {
		setShowCheckout(true);
	};
	const hasItems = items.length > 0;
	const cartItems = items.map((item) => {
		console.log(item.id);
		return (
			<CartItem
				key={item.id}
				name={item.name}
				amount={item.amount}
				price={item.price}
				onAdd={() => cartItemAddHandler(item)}
				onRemove={() => cartItemRemoveHandler(item.id)}
			/>
		);
	});

	console.log(cartItems);
	const show = (
		<div>
			<ul className={classes['cart-items']}>{cartItems}</ul>
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{amount}</span>
			</div>
			{showCheckout && <Checkout onClose={props.onClose} onConfirm={submitOrderHandler} />}
			{!showCheckout && (
				<div className={classes.actions}>
					<button className={classes['button--alt']} onClick={props.onClose}>
						Close
					</button>
					{hasItems && (
						<button className={classes.button} onClick={orderHandler}>
							Order
						</button>
					)}
				</div>
			)}
		</div>
	);

	return (
		<>
			<Modal onClick={props.onClose}>
				{error && <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

				{!error && !orderConfirm && show}

				{orderConfirm && <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{orderConfirm}</p>}
			</Modal>
		</>
	);
};

export default Cart;
