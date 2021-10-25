import ItemHistory from './ItemHistory';
import { useQueryItemHistory } from '../data/queries';

export default function SidebarHistory({ itemId: id }) {
	const { isLoading, data: history } = useQueryItemHistory(id);

	if (isLoading) {
		return null;
	}

	return (
		<ItemHistory history={history}/>
	);
}
