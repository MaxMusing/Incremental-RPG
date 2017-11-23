import React, { Component } from 'react';
import './HeroStats.css';
import { verboseNumber } from './Utilities';

import InventoryItem from './InventoryItem';

class HeroStats extends Component {
	render() {
		return (
			<div className="HeroStats">
				<p className="HeroStat">{this.props.hero.name}</p>
				<p className="HeroStat">Level: {verboseNumber(this.props.hero.level)}</p>
				<br />
				<div><span>Weapon: </span><InventoryItem item={this.props.hero.equipment.weapon} /></div>
				<div><span>Head Armour: </span><InventoryItem item={this.props.hero.equipment.headArmour} /></div>
				<div><span>Chest Armour: </span><InventoryItem item={this.props.hero.equipment.chestArmour} /></div>
				<div><span>Leg Armour: </span><InventoryItem item={this.props.hero.equipment.legArmour} /></div>
				<br />
				<p className="HeroStat">Damage: {verboseNumber(this.props.hero.damage())}</p>
				<p className="HeroStat">Attack Speed: {verboseNumber(this.props.hero.attackSpeed())}</p>
				<p className="HeroStat">Defence: {verboseNumber(this.props.hero.defence())}</p>
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
