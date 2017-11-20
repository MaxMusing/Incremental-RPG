import Character from './Character';

class Hero extends Character {
	constructor(props) {
		super(props);

		this.strength = props.strength || 1;
		this.dexterity = props.dexterity || 1;
		this.constitution = props.constitution || 1;
		this.intelligence = props.intelligence || 1;
	}
}

export default Hero;
