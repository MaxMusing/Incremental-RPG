import React, { Component } from 'react';
import './App.css';

import * as Globals from './Globals';
import Hero from './Hero';
import Enemy from './Enemy';
import Weapon from './Weapon';

import MainWindow from './MainWindow';
import HeroStatBars from './HeroStatBars';
import Log from './Log';

class App extends Component {
	constructor(props) {
		super(props);

		const startingWeapon = new Weapon({
			name: 'Stick',
			attackBoost: 2,
			attackSpeedMultiplier: 1,
		});

		this.state = {
			time: 0,
			hero: new Hero({
				app: this,
				name: 'Hero',
				weapon: startingWeapon,
			}),
			enemy: new Enemy({
				app: this,
				name: 'Enemy',
				level: 1,
			}),
			level: 1,
			log: [],
		};

		setInterval(() => {
			this.update();
		}, 1000 / Globals.updatesPerSecond);
	}

	componentDidMount() {
		this.addToLog('Welcome to Incremental RPG!');
	}

	update() {
		this.setState({
			time: this.state.time + 1
		});

		this.heroAttack();
	}

	generateEnemy() {

	}

	heroAttack() {
		let hero = this.state.hero;
		let enemy = this.state.enemy;

		enemy.changeHp(-hero.tickDamage(this.state.time));
		this.setState({enemy});

		if (enemy.alive()) {
			this.enemyAttack();
		} else {
			hero.changeXp(enemy.xpGiven());
			this.setState({hero});
			this.startNewFight();
		}
	}

	enemyAttack() {
		let hero = this.state.hero;
		let enemy = this.state.enemy;

		hero.changeHp(-enemy.tickDamage(this.state.time));
		this.setState({hero});
	}

	startNewFight() {
		let hero = this.state.hero;
		let enemy = new Enemy({
			app: this,
			name: 'Enemy',
			level: this.state.level,
		});

		hero.fullyHeal();

		this.setState({hero, enemy});
	}

	previousLevel() {
		this.setState({
			level: Math.max(1, this.state.level - 1)
		});
	}

	nextLevel() {
		this.setState({
			level: this.state.level + 1
		});
	}

	allocateSkillPoints(attribute, number) {
		const hero = this.state.hero;
		const skillPoints = hero.skillPoints;

		if (skillPoints >= number) {
			switch (attribute) {
				case 'Strength':
					hero.strength += number;
					hero.skillPoints -= number;
					break;
				case 'Dexterity':
					hero.dexterity += number;
					hero.skillPoints -= number;
					break;
				case 'Constitution':
					hero.constitution += number;
					hero.skillPoints -= number;
					break;
				case 'Intelligence':
					hero.intelligence += number;
					hero.skillPoints -= number;
					break;
				default:
					break;
			}

			this.setState({hero});
		}
	}

	addToLog(message) {
		let log = this.state.log;
		log.push(message);
		this.setState({log});
	}

	render() {
		return (
			<div className="App">
				<MainWindow
					hero={this.state.hero}
					enemy={this.state.enemy}
					level={this.state.level}
					previousLevel={this.previousLevel.bind(this)}
					nextLevel={this.nextLevel.bind(this)}
					allocateSkillPoints={this.allocateSkillPoints.bind(this)}
				/>
				<HeroStatBars hero={this.state.hero} />
				<Log log={this.state.log} />
			</div>
		);
	}
}

export default App;
