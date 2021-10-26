import ItemInfo from '../components/ItemInfo';
import LinkButton from './LinkButton';
import {
	useMutationAddItem,
	useQueryActiveTab,
	useQueryIdFromProvider,
	useQueryItem,
	useQueryItemFromProvider,
} from '../data/queries';

export default function PopupInfo() {
	// Get URL of active tab...
	const { isLoading: isLoadingActiveTab, data: activeTab } = useQueryActiveTab();

	// ...then check if any provider matches...
	const { isLoading: isLoadingProviderId, data: providerId } = useQueryIdFromProvider(activeTab && activeTab.url, { enabled: !!activeTab });
	// ...and start loading the provider info, in case it's needed...
	const { data: providerItem } = useQueryItemFromProvider(activeTab && activeTab.url, { enabled: !!activeTab });

	// ...and at the same time, try to load an existing item, if there is one.
	const { isLoading: isLoadingExistingItem, data: item } = useQueryItem(providerId, { enabled: !!providerId });

	const addItemMutation = useMutationAddItem(activeTab && activeTab.url);

	if (isLoadingActiveTab || isLoadingProviderId || isLoadingExistingItem) {
		return null;
	}

	const handleAddItem = () => {
		addItemMutation.mutate(providerItem);
	};

	return (
		<div className="PopupInfo">
			{item ?
				<ItemInfo item={item}/> :
				<form className="PopupInfo-addForm">
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
