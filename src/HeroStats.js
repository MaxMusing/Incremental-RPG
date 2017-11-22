import React, { Component } from 'react';
import './HeroStats.css';
import { verboseNumber } from './Utilities';

class HeroStats extends Component {
	render() {
		return (
			<div className="HeroStats">
				<p className="HeroStat">{this.props.hero.name}</p>
				<p className="HeroStat">Level: {verboseNumber(this.props.hero.level)}</p>
				<br />
				<p className="HeroStat">Weapon: {this.props.hero.equipment.weapon ? this.props.hero.equipment.weapon.name : 'None'}</p>
				<p className="HeroStat">Damage: {verboseNumber(this.props.hero.equipment.weapon.damage)}</p>
				<p className="HeroStat">Attack Speed: {verboseNumber(this.props.hero.equipment.weapon.attackSpeed)}</p>
				<br />
				<p className="HeroStat">Strength: {this.props.hero.strength} ({verboseNumber(this.props.hero.damageMultiplier())}x damage)</p>
				<p className="HeroStat">Dexterity: {this.props.hero.dexterity} ({verboseNumber(this.props.hero.attackSpeedMultiplier())}x attack speed)</p>
				<p className="HeroStat">Constitution: {this.props.hero.constitution} ({verboseNumber(this.props.hero.hpMaxMultiplier())}x max health)</p>
				<p className="HeroStat">Intelligence: {this.props.hero.intelligence} ({verboseNumber(this.props.hero.xpGainedMultiplier())}x experience gained)</p>
			</div>
		);
	}
}

export default HeroStats;
