import { graphql } from 'react-relay';
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
}
