import Character from './Character';
import allItems from './Items';

class Enemy extends Character {
	constructor(props) {
		super(props);

		this.generateItems(props.drops);
	}

	generateItems(drops) {
		for (let drop of drops) {
			const rand = Math.random();
			if (rand <= drop.chance) {
				const item = this.generateItem(drop.item);

				if (item) {
					this.pickUpItem(item);
				}
			}
		}
	}

	generateItem(drop) {
		const item = this.findItem(drop, allItems);

		if (item) {
			return (
				new item.type({
					name: item.name,
					damage: item.damage,
					attackSpeed: item.attackSpeed,
				})
			);
		} else {
			return null;
		}
	}

	findItem(drop, group) {
		if (drop in group) {
			return group[drop];
		} else {
			for (let subgroup in group) {
				if (group[subgroup] instanceof Object) {
					const item = this.findItem(drop, group[subgroup]);

					if (item) {
						return item;
					}
				}
			}

			return null;
		}
	}
}

export default Enemy;
