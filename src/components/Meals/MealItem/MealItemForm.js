import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import {useState} from 'react';

const MealItemForm = (props) => {

	const [amount, setAmount] = useState(1);
	const [value, setValue] = useState(1);
	const [validAmount, setValidAmount] = useState(true);
	
	

	const amountHandler = (e) => {
		e.preventDefault();
		if(+value < 0 || +value > 5 || +value === 0){
			setValidAmount(false);
			return;
		}
	    
		
		
		
		
		props.addToCart(value);
		setValue(1);
		setValidAmount(true);
		

	};

	const valueHandler = (e) => {
		setValue(e.target.value);
		console.log('hello')


	}

	return (
		<form className={classes.form} onSubmit = {amountHandler}>
			<Input
			onChange ={valueHandler}
			value={value}
				label="Amount"
				input={{ id: 'amount', type: 'number',  max: '5', step: '1'}}
			/>
			<button type='submit' >+Add</button>
			{!validAmount && <p>Enter A Valid Amount </p>}
		</form>
	);
};

export default MealItemForm;
