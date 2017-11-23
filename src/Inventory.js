import React, { Component } from 'react';
import './Inventory.css';

import InventoryItem from './InventoryItem';

class Inventory extends Component {
	renderItems() {
		let items = [];

		for (let [index, item] of this.props.hero.inventory.entries()) {
			items.push(
				<div>
					<InventoryItem
						item={item}
						action={this.props.useItem}
					/>
				</div>
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
