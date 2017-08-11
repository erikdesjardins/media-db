/* eslint-disable func-style */

import { createFragmentContainer, createRefetchContainer } from 'react-relay';

export const fragmentContainer =
	query => component => createFragmentContainer(component, query);

export const refetchContainer =
	(query, refetchQuery) => component => createRefetchContainer(component, query, refetchQuery);
