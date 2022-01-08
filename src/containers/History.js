import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HistoryList from '../components/HistoryList';
import HistoryRaw from '../components/HistoryRaw';

export default function History() {
	const params = useParams();
	const id = atob(params.id);
	const date = parseInt(params.date, 10);

	const navigate = useNavigate();

	const handleClickItemHistory = useCallback(date => {
		navigate(`/history/${btoa(id)}/${date}`, { replace: true });
	}, [navigate, id]);

	return (
		<div className="History">
			<div className="History-list">
				<HistoryList itemId={id} selectedDate={date} onClickItemHistory={handleClickItemHistory}/>
			</div>
			<div className="History-raw">
				<HistoryRaw itemId={id} date={date}/>
			</div>
		</div>
	);
}
