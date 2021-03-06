import React, { Component } from 'react';
import './App.css';

import * as Globals from './Globals';
import Hero from './classes/Hero';
import Enemy from './classes/Enemy';

import MainWindow from './MainWindow';
import HeroStatBars from './HeroStatBars';
import Log from './Log';
import InventoryItem from './InventoryItem';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			time: 0,
			battleTime: 0,
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
			time: this.state.time + 1,
			battleTime: this.state.battleTime + 1,
		});

		this.heroAttack();
	}

	heroAttack() {
		let hero = this.state.hero;
		let enemy = this.state.enemy;

		const damage = Math.max(0, hero.tickDamage(this.state.battleTime) - enemy.defence());
		enemy.changeHp(-damage);
		this.setState({enemy});

		if (enemy.alive()) {
			this.enemyAttack();
		} else {
			const xpGained = Math.round(enemy.xpGiven() * hero.xpGainedMultiplier());
			hero.gainXp(xpGained);

			this.addToLog(`${enemy.name} was defeated (+${xpGained} XP).`);

			for (let item of enemy.inventory) {
				hero.pickUpItem(item);
				this.addToLog(
					<span>
						You found a <InventoryItem item={item} />.
					</span>
				);
			}

			this.setState({hero});
			this.startNewBattle();
		}
	}

	enemyAttack() {
		let hero = this.state.hero;
		let enemy = this.state.enemy;

		const damage = Math.max(0, enemy.tickDamage(this.state.battleTime) - hero.defence());
		hero.changeHp(-damage);

		if (!hero.alive()) {
			this.addToLog(`${hero.name} was defeated.`);
			this.startNewBattle();
		}

		this.setState({hero});
	}

	startNewBattle() {
		let hero = this.state.hero;
		let enemy = this.generateEnemy(this.state.level);

		hero.fullyHeal();

		this.setState({hero, enemy});
		this.setState({battleTime: 0});
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
						chance: 0.01,
						item: "weapon",
						level: level
					},
					{
						chance: 0.01,
						item: "armour",
						level: level
					},
				],
			})
		);
	}

	useItem(item) {
		let hero = this.state.hero;

		hero.useItem(item);
		this.setState({hero});
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
					useItem={this.useItem.bind(this)}
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
