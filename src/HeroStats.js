import React, { Component } from 'react';
import './HeroStats.css';
import { verboseNumber } from './Utilities';
import Hero from './Hero';

class HeroStats extends Component {
	render() {
		return (
			<div className="HeroStats">
				<p className="HeroStat">{this.props.hero.name}</p>
				<p className="HeroStat">Level: {verboseNumber(this.props.hero.level)}</p>
				<br />
				<p className="HeroStat">Weapon: {this.props.hero.weapon ? this.props.hero.weapon.name : 'None'}</p>
				<p className="HeroStat">Damage: {verboseNumber(this.props.hero.weapon.damage)}</p>
				<p className="HeroStat">Attack Speed: {verboseNumber(this.props.hero.weapon.attackSpeed)}</p>
			</div>
		);
	}
}

export default HeroStats;
