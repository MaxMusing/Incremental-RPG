import React, { Component } from 'react';
import './MainWindow.css';

import { verboseNumber } from './Utilities';

import EnemyStatBars from './EnemyStatBars';
import HeroStats from './HeroStats';
import LevelController from './LevelController';
import SkillAllocation from './SkillAllocation';

class MainWindow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 0,
		};
	}

	renderTabs() {
		let tabs = [];
		const tabNames = [
			'Battle',
			'Stats',
			'Map',
		];

		for (let [index, tabName] of tabNames.entries()) {
			tabs.push(
				<span
					key={tabName}
					className={`Tab ${this.state.selectedTab == index ? ' Selected' : ''}`}
					onClick={() => this.setState({selectedTab: index})}
				>
					{tabName}
				</span>
			);
		}

		return tabs;
	}

	render() {
		return (
			<main className="MainWindow">
				<div className="TabContainer">
					{this.renderTabs()}
				</div>

				<div className="PageContainer">
					{this.state.selectedTab == 0 &&
						<div className="Page">
							<EnemyStatBars enemy={this.props.enemy} />
						</div>
					}
					{this.state.selectedTab == 1 &&
						<div className="Page">
							<HeroStats hero={this.props.hero} />
							<SkillAllocation character={this.props.hero} allocateSkillPoints={this.props.allocateSkillPoints} />
						</div>
					}
					{this.state.selectedTab == 2 &&
						<div className="Page">
							<LevelController level={this.props.level} previousLevel={this.props.previousLevel} nextLevel={this.props.nextLevel} />
						</div>
					}
				</div>
			</main>
		);
	}
}

export default MainWindow;
