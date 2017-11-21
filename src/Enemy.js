import Character from './Character';
import { getItem } from './Items';

import Weapon from './Weapon';

class Enemy extends Character {
	constructor(props) {
		super(props);

		this.generateItems(props.drops);
	}

	generateItems(drops) {
		for (let drop of drops) {
			const rand = Math.random();
			if (rand <= drop.chance) {
				const item = getItem(drop.item, drop.level);

				if (item) {
					const createdItem = this.createItem(item);
					this.pickUpItem(createdItem);
				}
			}
		}
	}

	createItem(item) {
		if (item.type) {
			switch (item.type) {
				case Weapon:
					return (
						new Weapon({
							name: item.name,
							damage: item.damage,
							attackSpeed: item.attackSpeed,
						})
					);
				default:
					return ({
						name: item.name,
					});
			}
		} else {
			return ({
				name: item.name,
			});
		}
	}
}

export default Enemy;
