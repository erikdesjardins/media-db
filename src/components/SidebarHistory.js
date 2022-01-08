import { useQueryItemHistory } from '../data/queries';
import ItemHistory from './ItemHistory';

export default function SidebarHistory({ itemId: id, onClickItemHistory }) {
	const { isLoading, data: history } = useQueryItemHistory(id, { keepPreviousData: true });

	if (isLoading) {
		return null;
	}

	return (
		<ItemHistory history={history} onClickItemHistory={onClickItemHistory}/>
	);
}
