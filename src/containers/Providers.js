import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProviderList from '../components/ProviderList';
import ProviderTest from '../components/ProviderTest';

export default function Providers() {
	const params = useParams();
	const url = atob(params.url || '');

	const navigate = useNavigate();

	const handleChangeUrl = useCallback(url => {
		navigate(`/providers/${btoa(url)}`);
	}, [navigate]);

	return (
		<div className="Providers">
			<div className="Providers-list">
				<ProviderList/>
			</div>
			<div className="Providers-test">
				<ProviderTest url={url} onChangeUrl={handleChangeUrl}/>
			</div>
		</div>
	);
}
