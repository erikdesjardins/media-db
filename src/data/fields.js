// *sigh*
// This file should not need to exist.
// It does, because Relay Modern must know exactly which fields to refetch from a mutation,
// instead of intersecting a fat query with the currently active queries.
// This means that it is trivial to underfetch when adding a node, and you will receive no warning,
// until your view code blows up--or worse, silently misbehaves.
// The only reasonable way to solve this is to always fetch all fields of newly created nodes.
// Even _worse_ is the fact that you can't do this by spreading the type to fetch all of its fields,
// because types can't be spread.
// So instead, we're forced to duplicate the definition of every single type as a fragment.
// Oh, and I can't even colocate this with the schema definition, because then Relay complains
// about invoking `graphql` at runtime--which is perhaps the only reasonable behaviour listed here.

import { graphql } from 'react-relay';

graphql`
	fragment fields_ItemFieldUpdates on ItemFieldUpdates {
		thumbnail
		tinyThumbnail
		title
		creator
		genres
		characters
		length
		productionStatus
	}

	fragment fields_Item_scalar on Item {
		id
		url
		thumbnail
		tinyThumbnail
		title
		creator
		genres
		characters
		notes
		tags
		length
		status
		productionStatus
		statusDate
		date
	}

	fragment fields_Item_fieldUpdates on Item {
		fieldUpdates {
			...fields_ItemFieldUpdates
		}
	}

	fragment fields_Item_history on Item {
		history {
			edges {
				node {
					...fields_Item_scalar
				}
			}
		}
	}

	fragment fields_Provider on Provider {
		id
		infoCallback
	}
`;
