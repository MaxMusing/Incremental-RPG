import React, { Component } from 'react';
import './Inventory.css';

class Inventory extends Component {
	renderItems() {
		let items = [];

		for (let [index, item] of this.props.hero.inventory.entries()) {
			items.push(
				<a
					key={index}
					className={`InventoryItem${this.props.hero.equipment.weapon === item ? ' Equipped' : ''}`}
					onClick={this.props.useItem.bind(this, item)}
				>
					{item.name}
				</a>
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
