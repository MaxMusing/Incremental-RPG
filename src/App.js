import React, { Component } from 'react';
import './App.css';

import * as Globals from './Globals';
import Hero from './Hero';
import Enemy from './Enemy';

import MainWindow from './MainWindow';
import HeroStatBars from './HeroStatBars';
import Log from './Log';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			time: 0,
			hero: new Hero({
				app: this,
				name: 'Hero',
			}),
			enemy: this.generateEnemy(1),
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

	heroAttack() {
		let hero = this.state.hero;
		let enemy = this.state.enemy;

		enemy.changeHp(-hero.tickDamage(this.state.time));
		this.setState({enemy});

		if (enemy.alive()) {
			this.enemyAttack();
		} else {
			const xpGained = Math.round(enemy.xpGiven() * hero.xpGainedMultiplier());
			hero.gainXp(xpGained);

			this.addToLog(`${enemy.name} was defeated (+${xpGained} XP).`);

			for (let item of enemy.inventory) {
				hero.pickUpItem(item);
				this.addToLog(`You found a ${item.name}.`);
			}

			this.setState({hero});
			this.startNewFight();
		}
	}

	enemyAttack() {
		let hero = this.state.hero;
		let enemy = this.state.enemy;

		hero.changeHp(-enemy.tickDamage(this.state.time));

		if (!hero.alive()) {
			this.addToLog(`${hero.name} was defeated.`);
			this.startNewFight();
		}

		this.setState({hero});
	}

	startNewFight() {
		let hero = this.state.hero;
		let enemy = this.generateEnemy(this.state.level);

		hero.fullyHeal();

		this.setState({hero, enemy});
	}

	generateEnemy(level) {
		let strength = 0;
		let dexterity = 0;
		let constitution = 0;
		let intelligence = 0;

		for (let i = 0; i < level; i++) {
			const attribute = Math.floor(Math.random() * 4);

			switch (attribute) {
				case 0:
					strength++;
					break;
				case 1:
					dexterity++;
					break;
				case 2:
					constitution++;
					break;
				case 3:
					intelligence++;
					break;
				default:
					break;
			}
		}

		return (
			new Enemy({
				app: this,
				name: 'Enemy',
				level: level,
				strength: strength,
				dexterity: dexterity,
				constitution: constitution,
				intelligence: intelligence,
				drops: [
					{
						chance: 0.02,
						item: "weapon",
						level: level
					},
					{
						chance: 0.01,
						item: "armour",
						level: level
					},
					{
						chance: 0.005,
						item: "consumable",
						level: level
					},
				],
			})
		);
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
