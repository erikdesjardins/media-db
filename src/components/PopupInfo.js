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
	const { isLoading: isLoadingProviderItem, isError: providerIsError, error: providerError, data: providerItem } = useQueryItemFromProvider(activeTab && activeTab.url, { enabled: !!activeTab });

	// ...and at the same time, try to load an existing item, if there is one.
	const { isLoading: isLoadingExistingItem, data: existingItem } = useQueryItem(providerId, { enabled: !!providerId });

	const addItemMutation = useMutationAddItem(activeTab && activeTab.url);

	const handleAddItem = () => {
		addItemMutation.mutate(providerItem);
	};

	// 1. Wait for existing item to load, and display it if it exists
	if (isLoadingActiveTab || isLoadingProviderId || isLoadingExistingItem) {
		return null;
	}
	if (existingItem) {
		return (
			<div className="PopupInfo">
				<ItemInfo item={existingItem}/>
			</div>
		);
	}

	// 2. Wait for full provider to load, and show add button if it matches
	if (isLoadingProviderItem) {
		return (
			<div className="PopupInfo">
				{'…'}
			</div>
		);
	}
	if (providerItem) {
		return (
			<div className="PopupInfo">
				<LinkButton onClick={handleAddItem}>
					{'✔️'}{' '}{'\''}{providerItem.title}{'\''}
				</LinkButton>
			</div>
		);
	}
	if (providerIsError) {
		return (
			<div className="PopupInfo">
				{'❌'}{' '}{providerError.message}
			</div>
		);
	}

	// 3. Neither an existing item exists nor do any providers match
	return (
		<div className="PopupInfo">
			{'❌'}{' '}{'No providers matched'}{' '}{'\''}{activeTab.url}{'\''}
		</div>
	);
}
