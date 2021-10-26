import numeral from 'numeral';

export default function ItemListLength({ item }) {
	return (
		<div className="ItemListLength CompactTable-item">
			<span title={item.length}>
				{numeral(item.length).format('0a')}
			</span>
		</div>
	);
}
