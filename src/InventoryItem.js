import React, { Component } from 'react';
import './InventoryItem.css';
import { verboseNumber } from './Utilities';

import Weapon from './classes/Weapon';
import Armour from './classes/Armour';

class InventoryItem extends Component {
	render() {
		return (
			<span
				className="InventoryItem TooltipTrigger"
				onClick={this.props.action && this.props.action.bind(this, this.props.item)}
			>
				<span className="ItemName">{this.props.item.name}</span>
				<div className="Tooltip">
					{this.props.item instanceof Weapon &&
						<div>
							<p className="TooltipInfo">Damage: {verboseNumber(this.props.item.damage)}</p>
							<p className="TooltipInfo">Attack Speed: {verboseNumber(this.props.item.attackSpeed)}</p>
						</div>
					}
					{this.props.item instanceof Armour &&
						<div>
							<p className="TooltipInfo">Defence: {verboseNumber(this.props.item.defence)}</p>
							<p className="TooltipInfo">Attack Speed Multiplier: {verboseNumber(this.props.item.attackSpeedMultiplier)}</p>
						</div>
					}
				</div>
			</span>
		);
	}
}

export default InventoryItem;
