import React, { Component } from 'react';
import './Log.css';
import { verboseNumber } from './Utilities';

class Log extends Component {
	renderLog() {
		let log = this.props.log.map((message) => {
			return <p className="LogMessage">{message}</p>;
		});

		log.reverse();

		return log;
	}

	render() {
		return (
			<div className="Log">
				{this.renderLog()}
			</div>
		);
	}
}

export default Log;
