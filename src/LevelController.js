import React, { Component } from 'react';
import './LevelController.css';
import { verboseNumber } from './Utilities';

class LevelController extends Component {
	render() {
		return (
			<div className="LevelController">
				<span onClick={this.props.previousLevel} className="ChangeLevelButton">&#8722;</span>
				<span className="LevelText">Level {this.props.level}</span>
				<span onClick={this.props.nextLevel} className="ChangeLevelButton">+</span>
			</div>
		);
	}
}

export default LevelController;
