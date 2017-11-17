import * as Globals from './Globals';

const baseName = 'Character';
const baseLevel = 1;
const baseHp = 100;
const baseXpMax = 100;
const baseAttack = 10;
const baseAttackSpeed = 1;
const baseXpGiven = 10;

class Character {
	constructor(props) {
		this.name = props.name || baseName;
		this.level = props.level || baseLevel;
		this.hp = props.hp || baseHp;
		this.hpMax = props.hpMax || baseHp;
		this.xp = props.xp || 0;
		this.xpMax = props.xpMax || baseXpMax;
		this.attack = props.attack || baseAttack;
		this.attackSpeed = props.attackSpeed || baseAttackSpeed;
		this.weapon = props.weapon || null;
	}

	effectiveAttack() {
		return (
			this.attack + (
				this.weapon ?
				this.weapon.attackBoost :
				0
			)
		);
	}

	effectiveAttackSpeed() {
		return (
			this.attackSpeed * (
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
			this.hp / this.hpMax * 100
		);
	}

	fullyHeal() {
		this.hp = this.hpMax;
	}

	changeHp(amount) {
		this.hp += amount;

		if (this.hp <= 0) {
			this.die();
		}

		if (this.hp > this.hpMax) {
			this.hp = this.hpMax;
		}
	}

	die() {

	}

	xpPercent() {
		return (
			this.xp / this.xpMax * 100
		);
	}

	changeXp(amount) {
		this.xp += amount;

		while (this.xp >= this.xpMax) {
			this.xp -= this.xpMax;
			this.levelUp();
		}
	}

	levelUp() {
		this.level += 1;
		this.xpMax = this.requiredXp();
	}

	requiredXp() {
		return (
			Math.floor(
				baseXpMax * Math.pow(1.1, this.level - 1)
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
