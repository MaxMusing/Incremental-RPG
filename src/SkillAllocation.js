import React, { Component } from 'react';
import './SkillAllocation.css';
import { verboseNumber } from './Utilities';

class SkillAllocation extends Component {
	render() {
		return (
			<table className="SkillAllocation">
				<tr>
					<th>Attribute</th>
					<th>Value</th>
					<th colspan="3">{this.props.character.skillPoints} skill points available</th>
				</tr>
				<tr>
					<td>Strength</td>
					<td>{this.props.character.strength}</td>
					<td
						className="SkillAllocationButton"
						onClick={this.props.allocateSkillPoints.bind(this, 'Strength', 1)}
					>
						+1
					</td>
					<td
						className="SkillAllocationButton"
						onClick={this.props.allocateSkillPoints.bind(this, 'Strength', 10)}
					>
						+10
					</td>
					<td
						className="SkillAllocationButton"
						onClick={this.props.allocateSkillPoints.bind(this, 'Strength', 100)}
					>
						+100
					</td>
				</tr>
				<tr>
					<td>Dexterity</td>
					<td>{this.props.character.dexterity}</td>
					<td
						className="SkillAllocationButton"
						onClick={this.props.allocateSkillPoints.bind(this, 'Dexterity', 1)}
					>
						+1
					</td>
					<td
						className="SkillAllocationButton"
						onClick={this.props.allocateSkillPoints.bind(this, 'Dexterity', 10)}
					>
						+10
					</td>
					<td
						className="SkillAllocationButton"
						onClick={this.props.allocateSkillPoints.bind(this, 'Dexterity', 100)}
					>
						+100
					</td>
				</tr>
				<tr>
					<td>Constitution</td>
					<td>{this.props.character.constitution}</td>
					<td
						className="SkillAllocationButton"
						onClick={this.props.allocateSkillPoints.bind(this, 'Constitution', 1)}
					>
						+1
					</td>
					<td
						className="SkillAllocationButton"
						onClick={this.props.allocateSkillPoints.bind(this, 'Constitution', 10)}
					>
						+10
					</td>
					<td
						className="SkillAllocationButton"
						onClick={this.props.allocateSkillPoints.bind(this, 'Constitution', 100)}
					>
						+100
					</td>
				</tr>
				<tr>
					<td>Intelligence</td>
					<td>{this.props.character.intelligence}</td>
					<td
						className="SkillAllocationButton"
						onClick={this.props.allocateSkillPoints.bind(this, 'Intelligence', 1)}
					>
						+1
					</td>
					<td
						className="SkillAllocationButton"
						onClick={this.props.allocateSkillPoints.bind(this, 'Intelligence', 10)}
					>
						+10
					</td>
					<td
						className="SkillAllocationButton"
						onClick={this.props.allocateSkillPoints.bind(this, 'Intelligence', 100)}
					>
						+100
					</td>
				</tr>
			</table>
		);
	}
}

export default SkillAllocation;
