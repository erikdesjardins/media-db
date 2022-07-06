import ItemRefreshButton from './ItemRefreshButton';

export default function ItemThumbnail({ item }) {
	return (
		<div className="ItemThumbnail">
			{item.thumbnail ?
				<img className="ItemThumbnail-img" src={item.thumbnail}/> :
				null
			}
			<ItemRefreshButton
				item={item}
				fields={['thumbnail', 'tinyThumbnail']}
				showLoadingIcon={false}
			/>
		</div>
	);
}
