import * as Globals from './Globals';
import { pluralize } from './Utilities';

const baseName = 'Character';
const baseLevel = 1;
const baseXpGiven = 10;

class Character {
	constructor(props) {
		this.app = props.app || null;
		this.name = props.name || baseName;

		this.xp = props.xp || 0;
		this.level = props.level || baseLevel;

		this.skillPoints = props.skillPoints || 0;
		this.strength = props.strength || 1;
		this.dexterity = props.dexterity || 1;
		this.constitution = props.constitution || 1;
		this.intelligence = props.intelligence || 1;

		this.hp = props.hp || this.hpMax();
		this.weapon = props.weapon || null;
	}

	hpMax() {
		const baseHpMax = 100;
		const constitutionMultiplier = 1.1;

		return (
			Math.round(
				baseHpMax * Math.pow(constitutionMultiplier, this.constitution - 1)
			)
		);
	}

	attack() {
		const baseAttack = 10;
		const strengthMultiplier = 1.1;

		return (
			Math.round(
				baseAttack * Math.pow(strengthMultiplier, this.strength - 1)
			)
		);
	}

	effectiveAttack() {
		return (
			this.attack() + (
				this.weapon ?
				this.weapon.attackBoost :
				0
			)
		);
	}

	attackSpeed() {
		const baseAttackSpeed = 1;
		const dexterityMultiplier = 1.1;

		return (
			baseAttackSpeed * Math.pow(dexterityMultiplier, this.dexterity - 1)
		);
	}

	effectiveAttackSpeed() {
		return (
			this.attackSpeed() * (
				this.weapon ?
				this.weapon.attackSpeedMultiplier :
				1
			)
		);
	}

	tickDamage(time) {
		return (
			this.effectiveAttackSpeed() > Globals.updatesPerSecond ?
			this.effectiveAttack() * this.effectiveAttackSpeed() / Globals.updatesPerSecond : (
				time % Math.round(Globals.updatesPerSecond / this.effectiveAttackSpeed()) === 0 ?
				this.effectiveAttack() :
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

		if (this.hp <= 0) {
			this.die();
		}

		if (this.hp > this.hpMax()) {
			this.hp = this.hpMax();
		}
	}

	die() {
		this.app.addToLog(`${this.name} was defeated (+${this.xpGiven()} XP).`);
	}

	xpPercent() {
		return (
			this.xp / this.xpMax() * 100
		);
	}

	changeXp(amount) {
		this.xp += amount;

		while (this.xp >= this.xpMax()) {
			this.xp -= this.xpMax();
			this.levelUp();
		}
	}

	levelUp() {
		this.level += 1;
		this.skillPoints += this.level;
		this.app.addToLog(`${this.name} levelled up (+${this.level} skill point${pluralize(this.level)}).`);
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
