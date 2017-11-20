import * as Globals from './Globals';
import Weapon from './Weapon';

const baseName = 'Character';
const baseLevel = 1;
const baseXpGiven = 10;
const defaultWeapon = new Weapon({
	name: 'Fists',
	damage: 5,
	attackSpeed: 1,
});

class Character {
	constructor(props) {
		this.app = props.app || null;
		this.name = props.name || baseName;

		this.xp = props.xp || 0;
		this.level = props.level || baseLevel;

		this.skillPoints = props.skillPoints || 0;
		this.strength = props.strength || 0;
		this.dexterity = props.dexterity || 0;
		this.constitution = props.constitution || 0;
		this.intelligence = props.intelligence || 0;

		this.hp = props.hp || this.hpMax();
		this.weapon = props.weapon || defaultWeapon;
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
				this.weapon.damage * this.damageMultiplier()
			)
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
			this.weapon.attackSpeed * this.attackSpeedMultiplier()
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

	equipWeapon(weapon) {
		this.weapon = weapon;
	}
}

export default Character;
