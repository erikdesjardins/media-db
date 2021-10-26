import ItemRefreshButton from './ItemRefreshButton';

export default function ItemTitleBlock({ item }) {
	return (
		<h2 className="ItemTitleBlock">
			<a href={item.url}>{item.title}</a>
			<small>
				{' by '}{item.creator}
				{' '}
				<ItemRefreshButton
					item={item}
					fields={['title', 'creator']}
					showLoadingIcon={false}
				/>
			</small>
		</h2>
	);
}
