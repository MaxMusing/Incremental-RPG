import * as Globals from '../Globals';
import Weapon from './Weapon';
import HeadArmour from './HeadArmour';
import ChestArmour from './ChestArmour';
import LegArmour from './LegArmour';

const baseName = 'Character';
const baseLevel = 1;
const baseXpGiven = 10;
const defaultWeapon = new Weapon({
	name: 'Fists',
	damage: 5,
	attackSpeed: 1,
});
const defaultHeadArmour = new HeadArmour({
	name: 'None',
	defence: 0,
	attackSpeedMultiplier: 1,
});
const defaultChestArmour = new ChestArmour({
	name: 'Shirt',
	defence: 0,
	attackSpeedMultiplier: 1,
});
const defaultLegArmour = new LegArmour({
	name: 'Pants',
	defence: 0,
	attackSpeedMultiplier: 1,
});

class Character {
	constructor(props) {
		this.app = props.app || null;
		this.name = props.name || baseName;
		this.inventory = props.inventory || [];

		this.xp = props.xp || 0;
		this.level = props.level || baseLevel;

		this.skillPoints = props.skillPoints || 0;
		this.strength = props.strength || 0;
		this.dexterity = props.dexterity || 0;
		this.constitution = props.constitution || 0;
		this.intelligence = props.intelligence || 0;

		this.hp = props.hp || this.hpMax();
		this.equipment = {
			weapon: props.weapon || defaultWeapon,
			headArmour: props.headArmour || defaultHeadArmour,
			chestArmour: props.chestArmour || defaultChestArmour,
			legArmour: props.legArmour || defaultLegArmour,
		}
	}

	hpMaxMultiplier() {
		const constitutionMultiplier = 1.1;

		return (
			Math.pow(constitutionMultiplier, this.constitution)
		);
	}

	hpMax() {
		const baseHpMax = 50;

		return (
			Math.round(
				baseHpMax * this.hpMaxMultiplier()
			)
		);
	}

	damageMultiplier() {
		const strengthMultiplier = 1.1;

		return (
			Math.pow(strengthMultiplier, this.strength)
		);
	}

	damage() {
		return (
			Math.round(
				this.equipment.weapon.damage * this.damageMultiplier()
			)
		);
	}

	defence() {
		return (
			this.equipment.headArmour.defence +
			this.equipment.chestArmour.defence +
			this.equipment.legArmour.defence
		);
	}

	attackSpeedMultiplier() {
		const dexterityMultiplier = 1.1;

		return (
			Math.pow(dexterityMultiplier, this.dexterity)
		);
	}

	attackSpeed() {
		return (
			this.equipment.weapon.attackSpeed *
			this.equipment.headArmour.attackSpeedMultiplier *
			this.equipment.chestArmour.attackSpeedMultiplier *
			this.equipment.legArmour.attackSpeedMultiplier *
			this.attackSpeedMultiplier()
		);
	}

	tickDamage(time) {
		return (
			this.attackSpeed() > Globals.updatesPerSecond ?
			this.damage() * this.attackSpeed() / Globals.updatesPerSecond : (
				time % Math.round(Globals.updatesPerSecond / this.attackSpeed()) === 0 ?
				this.damage() :
				0
			)
		);
	}

	alive() {
		return this.hp > 0;
	}

	hpPercent() {
		return (
			this.hp / this.hpMax() * 100
		);
	}

	fullyHeal() {
		this.hp = this.hpMax();
	}

	changeHp(amount) {
		this.hp += amount;

		if (this.hp > this.hpMax()) {
			this.hp = this.hpMax();
		}
	}

	xpPercent() {
		return (
			this.xp / this.xpMax() * 100
		);
	}

	xpGainedMultiplier() {
		const intelligenceMultiplier = 1.1;

		return (
			Math.pow(intelligenceMultiplier, this.intelligence)
		);
	}

	gainXp(amount) {
		this.xp += amount;

		while (this.xp >= this.xpMax()) {
			this.xp -= this.xpMax();
			this.levelUp();
		}
	}

	levelUp() {
		this.level += 1;
		this.skillPoints += 1;
		this.app.addToLog(`${this.name} levelled up (+1 skill point).`);
	}

	xpMax() {
		const baseXpMax = 100;
		const levelMultiplier = 1.1;

		return (
			Math.floor(
				baseXpMax * Math.pow(levelMultiplier, this.level - 1)
			)
		);
	}

	xpGiven() {
		return (
			Math.floor(
				baseXpGiven * Math.pow(1.1, this.level - 1)
			)
		);
	}

	pickUpItem(item) {
		this.inventory.push(item);
	}

	useItem(item) {
		const inventoryIndex = this.inventory.indexOf(item);

		switch (item.constructor) {
			case Weapon:
				if (this.equipment.weapon !== defaultWeapon) {
					this.inventory.push(this.equipment.weapon);
				}

				this.equipment.weapon = item;

				if (inventoryIndex !== -1) {
					this.inventory.splice(inventoryIndex, 1);
				}
				break;
			case HeadArmour:
				if (this.equipment.headArmour !== defaultHeadArmour) {
					this.inventory.push(this.equipment.headArmour);
				}

				this.equipment.headArmour = item;

				if (inventoryIndex !== -1) {
					this.inventory.splice(inventoryIndex, 1);
				}
				break;
			case ChestArmour:
				if (this.equipment.chestArmour !== defaultChestArmour) {
					this.inventory.push(this.equipment.chestArmour);
				}

				this.equipment.chestArmour = item;

				if (inventoryIndex !== -1) {
					this.inventory.splice(inventoryIndex, 1);
				}
				break;
			case LegArmour:
				if (this.equipment.legArmour !== defaultLegArmour) {
					this.inventory.push(this.equipment.legArmour);
				}

				this.equipment.legArmour = item;

				if (inventoryIndex !== -1) {
					this.inventory.splice(inventoryIndex, 1);
				}
				break;
		}
	}

	itemEquipped(item) {
		return (
			item === this.equipment.weapon ||
			item === this.equipment.headArmour ||
			item === this.equipment.chestArmour ||
			item === this.equipment.legArmour
		);
	}
}

export default Character;
