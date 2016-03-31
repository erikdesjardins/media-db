import Markdown from './Markdown';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				url,
				title,
				tags,
			}
		`,
	},
})
export default class ItemListTitle extends React.Component {
	render() {
		return (
			<div className="Item--nowrap">
				<Markdown
					source={`[${this.props.item.title}](${this.props.item.url})${this.props.item.tags}`}
				/>
			</div>
		);
	}
}
