import React, { Component } from 'react';
import './HeroStatBars.css';

class HeroStatBars extends Component {
	render() {
		return (
			<div className="HeroStatBars">
				<p className="BarLevelText">Level {this.props.hero.level} ({this.props.hero.xp} / {this.props.hero.xpMax()} XP)</p>
				<div className="ExperienceBar">
					<div className="ExperienceBarFill" style={{width: `${this.props.hero.xpPercent()}%`}}></div>
				</div>
				<div className="HealthBar">
					<span className="BarText">{this.props.hero.hp} / {this.props.hero.hpMax()}</span>
					<div className="HealthBarFill" style={{width: `${this.props.hero.hpPercent()}%`}}></div>
				</div>
			</div>
		);
	}
}

export default HeroStatBars;
