import React from 'react';
import ReactCSS from 'reactcss';
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
export default class ItemListThumbnail extends ReactCSS.Component {
	classes() {
		return {
			default: {
				thumbnail: {
					maxHeight: '20px',
					marginTop: '-8px',
					marginBottom: '-6px',
				},
			},
		};
	}

	render() {
		return (
			<div>
				{this.props.item.thumbnail &&
					<img is="thumbnail" src={this.props.item.thumbnail}/>
				}
			</div>
		);
	}
}
