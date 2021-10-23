import _ from 'lodash-es';
import React from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
import UpdateItemFieldsMutation from '../mutations/UpdateItemFieldsMutation';
import relay from 'relay-decorator';
import LinkButton from './LinkButton';

export default
@relay({
	fragments: {
		// unfortunately we need to fetch all of the fields of `fieldUpdates` to make this generic
		// but that's okay, because it's not any more expensive
		item: () => Relay.QL`
			fragment on Item {
				id
				fieldUpdates {
					thumbnail
					tinyThumbnail
					title
					creator
					genres
					characters
					length
					productionStatus
				}
				${UpdateItemFieldsMutation.getFragment('item')}
			}
		`,
	},
})
class ItemRefreshButton extends React.Component {
	static propTypes = {
		fields: PropTypes.arrayOf(PropTypes.oneOf([
			'thumbnail',
			'tinyThumbnail',
			'title',
			'creator',
			'genres',
			'characters',
			'length',
			'productionStatus',
		]).isRequired).isRequired,
	};

	isDisabled() {
		return this.props.fields.every(field => !this.props.item.fieldUpdates[field]);
	}

	handleClick = () => {
		Relay.Store.commitUpdate(new UpdateItemFieldsMutation({
			item: this.props.item,
			fieldUpdates: _.pick(this.props.item.fieldUpdates, this.props.fields),
		}));
	};

	render() {
		if (this.isDisabled()) {
			return null;
		}

		return (
			<LinkButton
				href="#"
				title={Object.values(_.pickBy(_.pick(this.props.item.fieldUpdates, this.props.fields), x => x)).join(', ')}
				className="ItemRefreshButton"
				onClick={this.handleClick}
			>
				{'🔄'}
			</LinkButton>
		);
	}
}
