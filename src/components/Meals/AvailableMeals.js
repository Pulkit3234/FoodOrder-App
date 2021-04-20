import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import axios from 'axios';
import { useEffect, useState } from 'react';

const DUMMY_MEALS = [];

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [loading, setLoading] = useState([]);
	useEffect(() => {
		const fetchMeals = async () => {
			const { data } = await axios.get('https://newthis-be766-default-rtdb.firebaseio.com/meals.json');
			console.log(data);
			const mealsData = [];
			for (const key in data) {
				console.log(key);
				mealsData.push({
					id: key,
					name: data[key].name,
					description: data[key].description,
					price: data[key].price,
				});
			}
			setMeals(mealsData);
		};

		fetchMeals();
	}, []);

	console.log(meals);
	const mealsList = meals.map((meal) => {
		console.log(meal.id);
		return (
			<MealItem key={meal.id} name={meal.name} description={meal.description} price={meal.price} id={meal.id} />
		);
	});

	return (
		<section>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
