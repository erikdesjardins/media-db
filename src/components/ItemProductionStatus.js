import EditItemProductionStatusMutation from '../mutations/EditItemProductionStatusMutation';
import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import Relay from 'react-relay';
import SelectBar from './SelectBar';
import relay from 'relay-decorator';
import * as productionStatusTypes from '../constants/productionStatusTypes';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import FormGroup from 'react-bootstrap/es/FormGroup';
import FormControl from 'react-bootstrap/es/FormControl';

export default
@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				productionStatus
				${ItemRefreshButton.getFragment('item')}
				${EditItemProductionStatusMutation.getFragment('item')}
			}
		`,
	},
})
class ItemProductionStatus extends React.Component {
	handleSave = value => {
		Relay.Store.commitUpdate(new EditItemProductionStatusMutation({
			item: this.props.item,
			productionStatus: value,
		}));
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
