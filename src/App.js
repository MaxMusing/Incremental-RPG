import React, { Component } from 'react';
import './App.css';

import * as Globals from './Globals';
import Hero from './Hero';
import Enemy from './Enemy';
import Weapon from './Weapon';
import CharacterInfo from './CharacterInfo';
import LevelController from './LevelController';

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
				name: 'Hero',
				weapon: startingWeapon,
			}),
			enemy: new Enemy({
				name: 'Enemy',
				level: 1,
			}),
			level: 1,
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

	render() {
		return (
			<div className="App">
				<CharacterInfo character={this.state.hero} />
				<CharacterInfo character={this.state.enemy} />
				<LevelController level={this.state.level} previousLevel={this.previousLevel.bind(this)} nextLevel={this.nextLevel.bind(this)} />
			</div>
		);
	}
}

export default App;
