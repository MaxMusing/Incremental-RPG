import React, { Component } from 'react';
import './Log.css';

class Log extends Component {
	renderLog() {
		let log = this.props.log.map((message, index) => {
			return (
				<p
					key={index}
					className="LogMessage"
				>
					{message}
				</p>
			);
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
