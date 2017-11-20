import Item from './Item';

class Weapon extends Item {
	constructor(props) {
		super(props);

		this.damage = props.damage;
		this.attackSpeed = props.attackSpeed;
	}
}

export default Weapon;
