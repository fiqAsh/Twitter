import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/signUpPage";
import HomePage from "./pages/home/HomePage";

function App() {
	return (
		<>
			<div className="flex max-w-6xl mx-auto">
				<Routes>
					<Route path="/" element={<HomePage></HomePage>}></Route>
					<Route
						path="/login"
						element={<LoginPage></LoginPage>}
					></Route>
					<Route
						path="/signup"
						element={<SignUpPage></SignUpPage>}
					></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
