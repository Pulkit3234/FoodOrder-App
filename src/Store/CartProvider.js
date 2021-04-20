import React, {useReducer} from 'react';
import CartContext from './Cart-Context';

const initialCartState = {
	items : [],
	totalAmount : 0
};

const cartReducer = (state, action) => {
	if(action.type === 'ADD') {
		const existingItemIndex = state.items.findIndex((item) => item.name === action.item.name);
		const existingItem = state.items[existingItemIndex];
		let updatedItems;
		
		if(existingItem) {
			console.log(existingItem.amount)
		console.log(action.item.amount)

			 const updatedItem = {
				...existingItem,
				amount : parseInt(existingItem.amount) + parseInt(action.item.amount),
			

			}
			console.log(updatedItem.amount)
			updatedItems = [...state.items];
			updatedItems[existingItemIndex] = updatedItem;
			
			
			}
		else{
			
		updatedItems = state.items.concat(action.item);
		console.log(updatedItems);


		}

		return {...state, items : updatedItems, totalAmount : state.totalAmount + action.item.price*action.item.amount};
		
	}

	if(action.type === 'SUBTRACT'){
		console.log(action.id);
		const existingItemIndex = state.items.findIndex((item) => item.id === action.id);
		const existingItem = state.items[existingItemIndex];
		console.log(existingItem)
		const totalAmount = state.totalAmount - existingItem.price;
		let updatedItem;
		let updatedItems;
		if(existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		
			
		}
		else{
			updatedItems = [...state.items];
			updatedItem = {...existingItem, amount : existingItem.amount - 1};
			updatedItems[existingItemIndex] = updatedItem;
		}
		return {...state, items : updatedItems, totalAmount};
	}
	return initialCartState;
}

const CartProvider = (props) => {
	const[cartState, dispatch] = useReducer(cartReducer, initialCartState);
	console.log(cartState)
	const addItemToCartHandler = (item) => {
		console.log(item.id)
		dispatch({type : "ADD", item })
	};

	const removeItemToCartHandler = (id) => {
		console.log(id)
		dispatch({type : 'SUBTRACT', id});
	}

	
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemToCartHandler,
	};

	return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
