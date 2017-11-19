import React, { Component } from 'react';
import './App.css';

import * as Globals from './Globals';
import Hero from './Hero';
import Enemy from './Enemy';
import Weapon from './Weapon';
import CharacterInfo from './CharacterInfo';
import LevelController from './LevelController';
import SkillAllocation from './SkillAllocation';
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

	update() {
		this.setState({
			time: this.state.time + 1
		});

		this.heroAttack();
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
				<CharacterInfo character={this.state.hero} />
				<CharacterInfo character={this.state.enemy} />
				<LevelController level={this.state.level} previousLevel={this.previousLevel.bind(this)} nextLevel={this.nextLevel.bind(this)} />
				<SkillAllocation character={this.state.hero} allocateSkillPoints={this.allocateSkillPoints.bind(this)} />
				<Log log={this.state.log} />
			</div>
		);
	}
}

export default App;
