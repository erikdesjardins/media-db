import { graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import Mutation from './Mutation';

export default class SetRawItemsMutation extends Mutation {
	constructor({ rawItems }) {
		super();
		this.rawItems = rawItems;
	}

	getMutation() {
		return graphql`
			mutation SetRawItemsMutation($input: SetRawItemsInput!) {
				setRawItems(input: $input) {
					viewer {
						rawItems
					}
				}
			}
		`;
	}

	getVariables() {
		return {
			rawItems: this.rawItems,
		};
	}

	getUpdater() {
		return store => {
			console.log(store, store.getRoot());
			// store.get('client:root').setLinkedRecords([], 'edges' /* todo use interface export */);
		};
	}
}
