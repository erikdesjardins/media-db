import Markdown from './Markdown';

export default function ItemListNotes({ item }) {
	return (
		<div className="ItemListNotes CompactTable-item CompactTable-item--autowrap CompactTable-item--small">
			<Markdown source={item.notes}/>
		</div>
	);
}
