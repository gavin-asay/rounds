import './App.css';
import Header from './components/Header';
import GridContainer from './components/GridContainer';

import { Provider } from 'react-redux';
import config from './utils/globalState';

function App() {
	return (
		<Provider store={config}>
			<Header />
			<main>
				<GridContainer />
			</main>
		</Provider>
	);
}

export default App;
