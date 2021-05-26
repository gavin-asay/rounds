import './App.css';
import Header from './components/Header';
import GridContainer from './components/GridContainer';

import { Provider } from 'react-redux';
import store from './utils/globalState';

function App() {
	return (
		<Provider store={store}>
			<Header />
			<main>
				<GridContainer />
			</main>
		</Provider>
	);
}

export default App;
