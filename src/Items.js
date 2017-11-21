import Weapon from './Weapon';

let allItems = {
	item: {
		equipment: {
			weapon: {
				dagger: {
					name: 'Dagger',
					type: Weapon,
					level: 3,
					damage: 8,
					attackSpeed: 1.2,
				},
				sword: {
					woodenSword: {
						name: 'Wooden Sword',
						type: Weapon,
						level: 6,
						damage: 10,
						attackSpeed: 1,
					},
					ironSword: {
						name: 'Iron Sword',
						type: Weapon,
						level: 16,
						damage: 20,
						attackSpeed: 1.2,
					},
				},
				hammer: {
					name: 'Hammer',
					type: Weapon,
					level: 10,
					damage: 15,
					attackSpeed: 0.6,
				},
			},
			armour: {
				leatherVest: {
					name: 'Leather Vest',
					level: 4,
				},
				leatherChaps: {
					name: 'Leather Chaps',
					level: 4,
				},
			},
		},
		consumable: {
			smallHealthPotion: {
				name: 'Small Health Potion',
				level: 10,
			},
		},
	},
};

setPath(allItems, '/');

function setPath(node, parentPath) {
	for (let key in node) {
		if (node[key] instanceof Object) {
			if (!node[key].hasOwnProperty('name')) {
				const path = `${parentPath}${key}/`;
				node[key].path = path;

				setPath(node[key], path);
			}
		}
	}
}

export function getItem(path) {
	const nodes = path.split('/').filter(node => node);
	let node = findNode(nodes[0]);

	nodes.splice(0).forEach(nodeName => {
		if (node.hasOwnProperty(nodeName)) {
			node = node[nodeName];
		}
	});

	const moveUpGroupChance = 0.05;
	let willMoveUpGroup;
	do {
		willMoveUpGroup = Math.random() <= moveUpGroupChance && node != nodeParent(node);

		if (willMoveUpGroup) {
			node = nodeParent(node);
		}
	} while (willMoveUpGroup);

	return (
		node ?
		getItemFromNode(node) :
		null
	);
}

function findNode(nodeName, group = allItems) {
	if (group.hasOwnProperty(nodeName)) {
		return group[nodeName];
	} else {
		for (let key in group) {
			if (group.hasOwnProperty(key)) {
				if (group[key] instanceof Object) {
					const node = findNode(nodeName, group[key]);

					if (node) {
						return node;
					}
				}
			}
		}

		return null;
	}
}

function getItemFromNode(node) {
	if (node.hasOwnProperty('name')) {
		return node;
	} else {
		let keys = Object.keys(node).filter(key => key !== 'path');

		if (keys.length === 0) {
			return null;
		} else {
			const randomKeyIndex = Math.floor(Math.random() * keys.length);
			const randomKey = keys[randomKeyIndex];
			const childNode = node[randomKey];

			return getItemFromNode(childNode);
		}
	}
}

function nodeParent(node) {
	const nodes = node.path.split('/').filter(node => node);

	return (
		nodes.length >= 2 ?
		findNode(nodes[nodes.length - 2]) :
		node
	);
}

export default allItems;
