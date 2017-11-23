import Item from './Item';

class Armour extends Item {
	constructor(props) {
		super(props);

		this.defence = props.defence;
		this.attackSpeedMultiplier = props.attackSpeedMultiplier;
	}
}

export default Armour;
