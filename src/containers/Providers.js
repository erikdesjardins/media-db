import ProviderList from '../components/ProviderList';
import ProviderTest from '../components/ProviderTest';

export default function Providers() {
	return (
		<div className="Providers">
			<div className="Providers-list">
				<ProviderList/>
			</div>
			<div className="Providers-test">
				<ProviderTest/>
			</div>
		</div>
	);
}
