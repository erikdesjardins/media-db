import SidebarItem from '../components/SidebarItem';
import { useParams } from 'react-router-dom';

export default function Sidebar() {
	const params = useParams();
	const id = atob(params.id);

	return (
		<div className="Sidebar">
			<SidebarItem itemId={id}/>
		</div>
	);
}
