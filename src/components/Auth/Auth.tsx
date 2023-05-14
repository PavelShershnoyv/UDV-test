import { useRef, useState } from "react";
import classes from "./Auth.module.css";
import { IRoom } from "../../interface/IRoom";
import { Link } from "react-router-dom";

const Auth = () => {
  const name = useRef("");
  const [room, setRoom] = useState("");
  let isRoom = false;

  const handlerEntry = () => {
    const rooms = { ...localStorage };

    for (let nameRoom in rooms) {
      if (nameRoom == room) {
        isRoom = true;
        let r: IRoom = JSON.parse(localStorage.getItem(nameRoom) || "{}");
        r.users.push(name.current);
        localStorage.setItem(nameRoom, JSON.stringify(r));
        break;
      }
    }

    if (!isRoom) {
      const newRoom: IRoom = {
        users: [name.current],
        messages: [],
      };
      localStorage.setItem(room, JSON.stringify(newRoom));
      isRoom = true;
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <div className={classes.title}>Вход</div>
        <input
          type="text"
          name="name"
          placeholder="Имя"
          autoComplete="off"
          onChange={(e) => {
            name.current = e.target.value;
          }}
        />
        <input
          type="text"
          name="room"
          placeholder="Название комнаты"
          autoComplete="off"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <Link to={`/chat?name=${name.current}&room=${room}`}>
          <button
            disabled={!name.current.trim() || !room.trim()}
            className={classes.entry}
            onClick={handlerEntry}
          >
            Войти
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Auth;
