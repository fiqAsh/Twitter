import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/signUpPage";
import HomePage from "./pages/home/HomePage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<>
			<div className="flex max-w-6xl mx-auto">
				{/* common component bc its not wrapped with routes */}
				<Sidebar></Sidebar>
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
					<Route
						path="/notifications"
						element={<NotificationPage></NotificationPage>}
					></Route>
					<Route
						path="/profile/:username"
						element={<ProfilePage></ProfilePage>}
					></Route>
				</Routes>
				<RightPanel></RightPanel>
				<Toaster></Toaster>
			</div>
		</>
	);
}

export default App;
