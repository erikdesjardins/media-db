
export default function ItemListThumbnail({ item }) {
	return (
		<div className="ItemListThumbnail CompactTable-item">
			{item.tinyThumbnail ?
				<img className="CompactTable-tinyThumbnail" src={item.tinyThumbnail}/> :
				null
			}
		</div>
	);
}
