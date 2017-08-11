import EditItemProductionStatusMutation from '../mutations/EditItemProductionStatusMutation';
import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import SelectBar from './SelectBar';
import * as productionStatusTypes from '../constants/productionStatusTypes';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import FormGroup from 'react-bootstrap/es/FormGroup';
import FormControl from 'react-bootstrap/es/FormControl';

export default
@fragmentContainer(graphql`
	fragment ItemProductionStatus_item on Item {
		productionStatus
		...ItemRefreshButton_item
		...EditItemProductionStatusMutation_item @relay(mask: false)
	}
`)
class ItemProductionStatus extends React.Component {
	handleSave = value => {
		new EditItemProductionStatusMutation({
			item: this.props.item,
			productionStatus: value,
		}).commit(this.props.relay.environment);
	};

	render() {
		return (
			<FormGroup>
				<ControlLabel>
					{'Production Status'}
					{' '}
					<ItemRefreshButton
						item={this.props.item}
						fields={['productionStatus']}
					/>
				</ControlLabel>
				<FormControl.Static>
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
				</FormControl.Static>
			</FormGroup>
		);
	}
}
