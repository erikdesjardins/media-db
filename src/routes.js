import App from './containers/App';
import Popup from './containers/Popup';
import Items from './containers/Items';
import Search from './containers/Search';
import Sidebar from './containers/Sidebar';
import SidebarInfo from './containers/SidebarInfo';
import SidebarHistory from './containers/SidebarHistory';
import Storage from './containers/Storage';
import Providers from './containers/Providers';
import React from 'react';
import { graphql } from 'react-relay';
import { makeRouteConfig, Redirect, Route } from 'found';

export const routeConfig = makeRouteConfig(
	<Route path="/" Component={App}>
		<Redirect to="/items"/>
		<Route
			path="popup" Component={Popup}
			query={graphql`query routes_Popup_Query { viewer { ...Popup_viewer } }`}
		/>
		<Route
			path="items" Component={Items}
			query={graphql`query routes_Items_Query { viewer { ...Items_viewer } }`}
		>
			<Route path=":id" Component={Sidebar}>
				<Route
					path="info" Component={SidebarInfo}
					prepareVariables={({ id }) => ({ id: decodeURIComponent(id) })}
					query={graphql`
						query routes_SidebarInfo_Query($id: ID!) {
							item: node(id: $id) { ...SidebarInfo_item }
							viewer { ...SidebarInfo_viewer }
						}
					`}
				/>
				<Route
					path="history" Component={SidebarHistory}
					prepareVariables={({ id }) => ({ id: decodeURIComponent(id) })}
					query={graphql`query routes_SidebarHistory_Query($id: ID!) { item: node(id: $id) { ...SidebarHistory_item } }`}
				/>
			</Route>
		</Route>
		<Route
			path="search/:query/:preview" Component={Search}
			prepareVariables={({ query, preview }) => ({ query: atob(query), preview: preview === 'preview' })}
			query={graphql`query routes_Search_Query($query: String!, $preview: Boolean!) { viewer { ...Search_viewer } }`}
		/>
		<Route
			path="providers" Component={Providers}
			query={graphql`query routes_Providers_Query { viewer { ...Providers_viewer } }`}
		/>
		<Route
			path="storage" Component={Storage}
			query={graphql`query routes_Storage_Query { viewer { ...Storage_viewer } }`}
		/>
	</Route>
);
