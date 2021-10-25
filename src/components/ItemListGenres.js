import Markdown from './Markdown';

export default function ItemListGenres({ item }) {
	return (
		<div className="ItemListGenres CompactTable-item CompactTable-item--small CompactTable-item--nowrap">
			<Markdown source={item.genres}/>
		</div>
	);
}
