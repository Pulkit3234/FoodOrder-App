import classes from './Input.module.css';
import {useState} from 'react';

const Input = (props) => {

	return (
		<div className={classes.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input {...props.input} onChange={props.onChange} value={props.value}/>
		</div>
	);
};

export default Input;

//this technique is very good for multiple prop extraction, keep this in mind, used to transfer props to input field.
