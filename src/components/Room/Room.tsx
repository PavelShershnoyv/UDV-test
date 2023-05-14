import { Link, useLocation } from "react-router-dom";
import classes from "./Room.module.css";
import { useEffect, useRef, useState } from "react";
import Messages from "../Messages/Messages";
import { IRoom } from "../../interface/IRoom";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import emoji from "../../images/icon.svg";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const Room = () => {
  const { search } = useLocation();
  const [params, setParams] = useState<{ [k: string]: string }>();
  const [ren, setRen] = useState(false);
  const [msg, setMsg] = useState("");
  const [count, setCount] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  //@ts-ignore
  const initialValue: HTMLDivElement = <></>;
  const container = useRef<HTMLDivElement>(initialValue);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    // debugger;
    let r: IRoom = JSON.parse(
      localStorage.getItem(searchParams?.room || "") || "{}"
    );
    if (Object.keys(r).length) {
      r.messages.push({
        text: `В комнату присоединился ${searchParams?.name}`,
        user: "Admin",
      });
      localStorage.setItem(searchParams?.room || "", JSON.stringify(r));

      setCount(r.users.length);
    } else {
      setNotFound(true);
    }
  }, []);

  useEffect(() => {
    container.current.scrollTop = container.current.scrollHeight;
  }, [ren, msg, count]);

  let room: IRoom = JSON.parse(
    localStorage.getItem(params?.room || "") || "{}"
  );

  window.onstorage = (event) => {
    room = JSON.parse(localStorage.getItem(params?.room || "") || "{}");
    setRen(!ren);
    setCount(room.users.length);
  };

  const handlerSend = () => {
    room.messages.push({ text: msg, user: params?.name });
    localStorage.setItem(params?.room || "", JSON.stringify(room));
    setMsg("");
    setOpen(false);
  };

  const handlerExit = () => {
    room.users = room.users.filter((name) => name !== params?.name);
    room.messages.push({
      text: `Из комнаты вышел ${params?.name}`,
      user: "Admin",
    });
    localStorage.setItem(params?.room || "", JSON.stringify(room));
    setCount(room.users.length);
  };

  const onEmojiClick = ({ emoji }: EmojiClickData) => {
    setMsg(`${msg} ${emoji}`);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handlerSend();
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <>
      {!notFound ? (
        <div className={classes.main}>
          <div className={classes.wrapper}>
            <div className={classes.header}>
              <div>Комната: {params?.room}</div>
              <div>Посетителей в команте: {count}</div>
              <Link to="/">
                <button className={classes.exit} onClick={handlerExit}>
                  Выйти
                </button>
              </Link>
            </div>
            <div className={classes.messages} ref={container}>
              <Messages messages={room.messages} name={params?.name} />
            </div>
            <div className={classes.control}>
              <input
                type="text"
                name="message"
                value={msg}
                placeholder="Напишите сообщение..."
                className={classes.input}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                onKeyDown={onKeyDown}
              />
              <div className={classes.emojies}>
                <img src={emoji} alt="" onClick={() => setOpen(!isOpen)} />
                {isOpen && (
                  <div className={classes.emoji}>
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </div>
              <button className={classes.send} onClick={handlerSend}>
                Отправить
              </button>
            </div>
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default Room;
