import Weapon from './Weapon';

const allItems = {
	item: {
		equipment: {
			weapon: {
				dagger: {
					name: 'Dagger',
					type: Weapon,
					level: 3,
					damage: 8,
					attackSpeed: 1.2
				},
				sword: {
					name: 'Sword',
					type: Weapon,
					level: 6,
					damage: 10,
					attackSpeed: 1
				}
			},
			armour: {
				leatherVest: {
					name: 'Leather Vest',
					level: 4
				},
				leatherChaps: {
					name: 'Leather Chaps',
					level: 4
				}
			}
		},
		consumable: {
			smallHealthPotion: {
				name: 'Small Health Potion',
				level: 10
			}
		}
	}
}

export default allItems;
