import EditItemProductionStatusMutation from '../mutations/EditItemProductionStatusMutation';
import React from 'react';
import Relay from 'react-relay';
import SelectBar from './SelectBar';
import relay from 'relay-decorator';
import * as productionStatusTypes from '../constants/productionStatusTypes';
import { FormControls } from 'react-bootstrap';

const FormControlsStatic = FormControls.Static;

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				productionStatus,
				${EditItemProductionStatusMutation.getFragment('item')}
			}
		`,
	},
})
export default class ItemProductionStatus extends React.Component {
	handleSave = value => {
		Relay.Store.commitUpdate(new EditItemProductionStatusMutation({
			item: this.props.item,
			productionStatus: value,
		}));
	};

	render() {
		return (
			<FormControlsStatic label="Production Status">
				<SelectBar
					bsSize="xsmall"
					selected={this.props.item.productionStatus}
					onSelect={this.handleSave}
					options={[{
						value: productionStatusTypes.INCOMPLETE,
						name: 'Incomplete',
					}, {
						value: productionStatusTypes.HIATUS,
						name: 'Hiatus',
					}, {
						value: productionStatusTypes.COMPLETE,
						name: 'Complete',
					}, {
						value: productionStatusTypes.CANCELLED,
						name: 'Cancelled',
					}]}
				/>
			</FormControlsStatic>
		);
	}
}
