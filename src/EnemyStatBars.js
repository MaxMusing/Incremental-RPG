import React, { Component } from 'react';
import './EnemyStatBars.css';

class EnemyStatBars extends Component {
	render() {
		return (
			<div className="EnemyStatBars">
				<p className="BarLevelText">Level {this.props.enemy.level} {this.props.enemy.name}</p>
				<div className="EnemyHealthBar">
					<span className="BarText">{this.props.enemy.hp} / {this.props.enemy.hpMax()}</span>
					<div className="HealthBarFill" style={{width: `${this.props.enemy.hpPercent()}%`}}></div>
				</div>
			</div>
		);
	}
}

export default EnemyStatBars;
