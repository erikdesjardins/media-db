import PopupInfo from '../components/PopupInfo';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import Grid from 'react-bootstrap/es/Grid';

export default
@fragmentContainer(graphql`
	fragment Popup_viewer on User {
		...PopupInfo_viewer
	}
`)
class Popup extends React.Component {
	render() {
		return (
			<Grid fluid>
				<PopupInfo viewer={this.props.viewer}/>
			</Grid>
		);
	}
}
