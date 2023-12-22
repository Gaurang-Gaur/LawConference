import styles from "./styles.module.css";
import "./bootstrap.min.css";
import {useSocket} from "../../context/SocketProvider";
import {useState,useCallback,useEffect} from "react";
import {useNavigate} from "react-router-dom"


const Lobby = () => {
	const navigate=useNavigate();

	const [email,setEmail]=useState("");
	const [room,setRoom]=useState("");
	console.log(email);
	console.log(room);
const socket=useSocket();
// console.log(socket);

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const handleSubmitForm=useCallback((e)=>{
		e.preventDefault();
		socket.emit("room:join",{email,room})
	},[email,room,socket])

	const handleJoinRoom=useCallback((data)=>{
		const {email,room}=data;
		navigate(`/room/${room}`);
		
	},[navigate])


	useEffect(()=>{
		socket.on('room:join',handleJoinRoom);
		return ()=>{
			socket.off("room:join",handleJoinRoom);
		}

	})

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>LawConference</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmitForm}>
						<h1>LOBBY</h1>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							placeholder="Email"
							name="email"
							id="email"
							value={email}
							onChange={(e)=>setEmail(e.target.value)}
						
							className={styles.input}
						/>
						<label htmlFor="roomid"> Room Id</label>

						<input
							type="Room Id"
							placeholder="Room Id"
							name="Room Id"
							id="roomid"
							value={room}
							onChange={(e)=>setRoom(e.target.value)}
						
							className={styles.input}
						/>
						
						<button type="submit" className={styles.green_btn}>
							Join
						</button>
					</form>
					</div>
					</div>
					</div>
			

		</div>
		

  

		
	);
};

export default Lobby;
