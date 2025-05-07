import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import CreateDocument from './pages/CreateDocument';
import ReviewSelection from './pages/ReviewSelection';
import PreviewDocument from './pages/PreviewDocument';

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<LandingPage />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/create" element={<CreateDocument />} />
				<Route path="/create/reviews" element={<ReviewSelection />} />
				<Route path="/create/preview" element={<PreviewDocument />} />
			</Route>
		</Routes>
	);
}

export default App;
