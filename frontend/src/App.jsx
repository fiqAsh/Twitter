import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/signUpPage";
import HomePage from "./pages/home/HomePage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
	const { data: authUser, isLoading } = useQuery({
		//we use query key to give a unique name to our query and so that we can refer to it later
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");
				const data = res.json();

				if (data.error) return null;

				if (!res.ok) {
					throw new Error(data.error || "something went wrong");
				}
				console.log("authuser is here:", data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		retry: false,
	});

	if (isLoading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<LoadingSpinner size="lg"></LoadingSpinner>
			</div>
		);
	}
	return (
		<>
			<div className="flex max-w-6xl mx-auto">
				{/* common component bc its not wrapped with routes */}
				{authUser && <Sidebar></Sidebar>}
				<Routes>
					<Route
						path="/"
						element={
							authUser ? (
								<HomePage></HomePage>
							) : (
								<Navigate to="/login"></Navigate>
							)
						}
					></Route>
					<Route
						path="/login"
						element={
							!authUser ? (
								<LoginPage></LoginPage>
							) : (
								<Navigate to="/"></Navigate>
							)
						}
					></Route>
					<Route
						path="/signup"
						element={
							!authUser ? (
								<SignUpPage></SignUpPage>
							) : (
								<Navigate to="/"></Navigate>
							)
						}
					></Route>
					<Route
						path="/notifications"
						element={
							authUser ? (
								<NotificationPage></NotificationPage>
							) : (
								<Navigate to="/login"></Navigate>
							)
						}
					></Route>
					<Route
						path="/profile/:username"
						element={
							authUser ? (
								<ProfilePage></ProfilePage>
							) : (
								<Navigate to="/login"></Navigate>
							)
						}
					></Route>
				</Routes>
				{authUser && <RightPanel></RightPanel>}
				<Toaster></Toaster>
			</div>
		</>
	);
}

export default App;
