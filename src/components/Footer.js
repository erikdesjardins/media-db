import React from 'react';

export default class Footer extends React.PureComponent {
	render() {
		const styles = {
			spacer: {
				marginTop: '20px',
			},
		};

		return (
			<div style={styles.spacer}/>
		);
	}
}
