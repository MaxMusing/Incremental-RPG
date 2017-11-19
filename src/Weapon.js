class Weapon {
	constructor(props) {
		this.name = props.name;
		this.attackBoost = props.attackBoost;
		this.attackSpeedMultiplier = props.attackSpeedMultiplier;
	}

	verboseName() {
		return (
			`${this.name} (${this.verboseAttackBoost()} attack, ${this.attackSpeedMultiplier}× attack speed)`
		);
	}

	verboseAttackBoost() {
		return (
			this.attackBoost >= 0 ?
			`+${this.attackBoost}` :
			this.attackBoost
		);
	}
}

export default Weapon;
