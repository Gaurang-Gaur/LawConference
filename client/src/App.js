import { Route, Routes, Navigate } from "react-router-dom";
import Lobby from "./components/Main/Lobby";
import Signup from "./components/Singup";
import Login from "./components/Login";
import RoomPage from "./components/Main/Screen";


function App() {
	const user = localStorage.getItem("token");
	// console.log(user);

	return (
		<Routes>
			{user && <Route path="/" exact element={<Lobby />} />}
			{user &&<Route path="/room/:roomId" element={<RoomPage/>}/>}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
