import React, { Component } from 'react';
import './Inventory.css';

class Inventory extends Component {
	renderItems() {
		let items = [];

		for (let [index, item] of this.props.hero.inventory.entries()) {
			items.push(
				<p
					key={index}
				>
					{item.name}
				</p>
			);
		}

		return items;
	}

	render() {
		return (
			<div className="Inventory">
				{this.renderItems()}
			</div>
		);
	}
}

export default Inventory;
