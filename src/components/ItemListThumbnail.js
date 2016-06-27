import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				thumbnail,
			}
		`,
	},
})
export default class ItemListThumbnail extends React.Component {
	render() {
		const styles = {
			thumbnail: {
				maxHeight: '20px',
				marginTop: '-8px',
				marginBottom: '-6px',
			},
		};

		return (
			<div className="CompactTable-item">
				{this.props.item.thumbnail &&
					<img style={styles.thumbnail} src={this.props.item.thumbnail}/>
				}
			</div>
		);
	}
}
