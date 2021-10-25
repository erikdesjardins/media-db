import Markdown from './Markdown';

export default function ItemListCreator({ item }) {
	return (
		<div className="ItemListCreator CompactTable-item CompactTable-item--nowrap">
			<Markdown source={item.creator}/>
		</div>
	);
}
