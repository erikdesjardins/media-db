import ItemInfo from './ItemInfo';
import { useQueryItem } from '../data/queries';

export default function SidebarInfo({ itemId: id }) {
	const { isLoading, data: item } = useQueryItem(id, { keepPreviousData: true });

	if (isLoading) {
		return null;
	}

	return (
		<ItemInfo item={item}/>
	);
}
