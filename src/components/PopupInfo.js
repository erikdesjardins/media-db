import ItemInfo from '../components/ItemInfo';
import React from 'react';
import LinkButton from './LinkButton';
import {
	useMutationAddItem,
	useQueryActiveTab,
	useQueryItem,
	useQueryItemFromProvider,
} from '../data/queries';

export default function PopupInfo() {
	const { isLoading: isLoadingActiveTab, data: activeTab } = useQueryActiveTab();
	const { isLoading: isLoadingProvider, data: providerItem } = useQueryItemFromProvider(activeTab && activeTab.url, { enabled: !!activeTab });
	const { isLoading: isLoadingExistingItem, data: item } = useQueryItem(providerItem && providerItem.id, { enabled: !!providerItem });

	const mutation = useMutationAddItem(activeTab && activeTab.url);

	if (isLoadingActiveTab || isLoadingProvider || isLoadingExistingItem) {
		return null;
	}

	const handleAddItem = () => {
		mutation.mutate(providerItem);
	};

	return (
		<div className="PopupInfo">
			{item ?
				<ItemInfo item={item}/> :
				<form>
					<LinkButton
						disabled={!providerItem}
						onClick={handleAddItem}
					>
						{'Add'}
					</LinkButton>
				</form>
			}
		</div>
	);
}
