import Weapon from './Weapon';
import HeadArmour from './HeadArmour';
import ChestArmour from './ChestArmour';
import LegArmour from './LegArmour';

let allItems = {
	item: {
		equipment: {
			weapon: {
				dagger: {
					ironDagger: {
						name: 'Iron Dagger',
						type: Weapon,
						level: 4,
						damage: 10,
						attackSpeed: 1.2,
					},
					steelDagger: {
						name: 'Steel Dagger',
						type: Weapon,
						level: 14,
						damage: 14,
						attackSpeed: 1.3,
					},
				},
				sword: {
					woodenSword: {
						name: 'Wooden Sword',
						type: Weapon,
						level: 2,
						damage: 8,
						attackSpeed: 1,
					},
					ironSword: {
						name: 'Iron Sword',
						type: Weapon,
						level: 12,
						damage: 20,
						attackSpeed: 1.1,
					},
					steelSword: {
						name: 'Steel Sword',
						type: Weapon,
						level: 22,
						damage: 25,
						attackSpeed: 1.2,
					},
				},
				hammer: {
					name: 'Hammer',
					type: Weapon,
					level: 10,
					damage: 15,
					attackSpeed: 0.8,
				},
			},
			armour: {
				headArmour: {
					leatherCap: {
						name: 'Leather Cap',
						type: HeadArmour,
						level: 2,
						defence: 1,
						attackSpeedMultiplier: 1,
					},
					ironHelmet: {
						name: 'Iron Helmet',
						type: HeadArmour,
						level: 12,
						defence: 2,
						attackSpeedMultiplier: 0.9,
					},
					ironFullHelmet: {
						name: 'Iron Full Helmet',
						type: HeadArmour,
						level: 17,
						defence: 3,
						attackSpeedMultiplier: 0.8,
					},
				},
				chestArmour: {
					leatherVest: {
						name: 'Leather Vest',
						type: ChestArmour,
						level: 3,
						defence: 1,
						attackSpeedMultiplier: 1,
					},
					ironChainMail: {
						name: 'Iron Chain Body',
						type: ChestArmour,
						level: 13,
						defence: 2,
						attackSpeedMultiplier: 0.9,
					},
					ironChestplate: {
						name: 'Iron Plate Body',
						type: ChestArmour,
						level: 18,
						defence: 3,
						attackSpeedMultiplier: 0.8,
					},
				},
				legArmour: {
					leatherChaps: {
						name: 'Leather Chaps',
						type: LegArmour,
						level: 4,
						defence: 1,
						attackSpeedMultiplier: 1,
					},
					ironPlateLegs: {
						name: 'Iron Plate Legs',
						type: LegArmour,
						level: 14,
						defence: 3,
						attackSpeedMultiplier: 0.8,
					},
				},
			},
		},
		consumable: {
			potion: {
				speedPotion: {
					smallSpeedPotion: {
						name: 'Small Speed Potion',
						level: 10,
					},
					mediumSpeedPotion: {
						name: 'Medium Speed Potion',
						level: 20,
					},
					largeSpeedPotion: {
						name: 'Large Speed Potion',
						level: 30,
					},
					hugeSpeedPotion: {
						name: 'Huge Speed Potion',
						level: 40,
					},
				},
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

export function getItem(path, level) {
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
		willMoveUpGroup = Math.random() <= moveUpGroupChance && node !== nodeParent(node);

		if (willMoveUpGroup) {
			node = nodeParent(node);
		}
	} while (willMoveUpGroup);

	return (
		node ?
		getItemFromNode(node, level) :
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

function getItemFromNode(node, level) {
	const leaves = getNodeLeaves(node);
	leaves.sort((a, b) => {
		const levelDifferenceA = Math.abs(a.level - level);
		const levelDifferenceB = Math.abs(b.level - level);

		return levelDifferenceA - levelDifferenceB;
	});

	const randomLeafIndex = Math.floor(Math.pow(Math.random(), 1.5) * leaves.length);

	return leaves[randomLeafIndex];
}

function getNodeLeaves(node) {
	let leaves = [];

	if (node.hasOwnProperty('name')) {
		leaves.push(node);
		return leaves;
	} else {
		for (let key in node) {
			if (node.hasOwnProperty(key)) {
				if (node[key] instanceof Object) {
					leaves = leaves.concat(getNodeLeaves(node[key]));
				}
			}
		}

		return leaves;
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
