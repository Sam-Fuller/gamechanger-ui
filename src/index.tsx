import './index.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import { HostView } from './views/host/hostView';
import { PlayerView } from './views/player/playerView';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<BrowserRouter>	
			<Routes>
				<Route path="/" element={<PlayerView />} />
				<Route path="/host" element={<HostView />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
