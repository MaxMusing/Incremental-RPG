import React, { Component } from 'react';
import './LevelController.css';

class LevelController extends Component {
	render() {
		return (
			<div className="LevelController">
				<span onClick={this.props.previousLevel} className="ChangeLevelButton">−</span>
				<span className="LevelText">Level {this.props.level}</span>
				<span onClick={this.props.nextLevel} className="ChangeLevelButton">+</span>
			</div>
		);
	}
}

export default LevelController;
