import React, { Component } from 'react';
import './CharacterInfo.css';
import { verboseNumber } from './Utilities';
import Hero from './Hero';

class CharacterInfo extends Component {
	render() {
		return (
			<div className="CharacterInfo">
				<p className="CharacterStat">{this.props.character.name}</p>
				<p className="CharacterStat">Level: {verboseNumber(this.props.character.level)}</p>
				<p className="CharacterStat">HP: {verboseNumber(this.props.character.hp)} / {verboseNumber(this.props.character.hpMax)}</p>
				{this.props.character instanceof Hero ?
					<p className="CharacterStat">XP: {verboseNumber(this.props.character.xp)} / {verboseNumber(this.props.character.xpMax)}</p> :
					<p className="CharacterStat">XP: {verboseNumber(this.props.character.xpGiven())}</p>
				}
				<p className="CharacterStat">Attack: {verboseNumber(this.props.character.attack)}</p>
				<p className="CharacterStat">Attack Speed: {verboseNumber(this.props.character.attackSpeed)}</p>
				<p className="CharacterStat">Weapon: {this.props.character.weapon ? this.props.character.weapon.verboseName() : 'None'}</p>
			</div>
		);
	}
}

export default CharacterInfo;
