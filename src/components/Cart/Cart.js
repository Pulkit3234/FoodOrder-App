import {useContext} from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../Store/Cart-Context';
import CartItem from './CartItem';

const Cart = (props) => {
	const {items,totalAmount,addItem, removeItem} = useContext(CartContext);
	const amount = `$${totalAmount.toFixed(2)}`;
	console.log(props)
	

	const cartItemAddHandler = (item) => {

addItem({...item, amount : 1});


	};

	const cartItemRemoveHandler = (id) => {
		console.log(id)

		removeItem(id);

	};
	const hasItems = items.length>0;
	const cartItems = items.map((item) => {
		console.log(item.id)
				return <CartItem key={item.id} name={item.name}  amount={item.amount} price={item.price} onAdd={()=> cartItemAddHandler(item)} 
				onRemove={() => cartItemRemoveHandler(item.id)}/>
			});
		
	console.log(cartItems)

	return (
		<>
			<Modal onClick={props.onClose}>
				<div>
				<ul className={classes['cart-items']}>
					{cartItems}
					</ul>
					<div className={classes.total}>
						<span>Total Amount</span>
						<span>{amount}</span>
					</div>
					<div className={classes.actions}>
						<button className={classes['button--alt']} onClick={props.onClose}>
							Close
						</button>
						{hasItems && <button className={classes.button}>Order</button>}
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Cart;
