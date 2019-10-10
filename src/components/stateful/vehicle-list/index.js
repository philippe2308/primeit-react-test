import React, { Component } from 'react';
import { CardVehicle } from './../../stateless/card-vehicle';
import { getData } from '../../../api';
import './styles.css';

export default class VehicleList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null
		}
	}

	componentDidMount() {
		getData((data) => {
			console.log(data);
			this.setState({
				data:data
			});
		});
	}

	render() {
		if(this.state.data!==null) {
			const vehicles=this.state.data.vehicles;
			console.log(vehicles);
		    return (
					<div className='vehicleList'>
						{
							vehicles.map((item)=>
							<CardVehicle
								key={item.id}
								item={item}
							/>)
						}
					</div>
		    )
	    }

		return (<h1>Loading...</h1>);
	}
}
