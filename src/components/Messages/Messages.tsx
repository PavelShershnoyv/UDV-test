import { IMessage } from "../../interface/IRoom";
import classes from "../Messages/Messages.module.css";

type MessagesProps = {
  messages: IMessage[];
  name: string | undefined;
};

const Messages = ({ messages, name }: MessagesProps) => {
  return (
    <div className={classes.messages}>
      {messages &&
        messages.map((el) => {
          const itsMe =
            name?.trim().toLowerCase() === el.user?.trim().toLowerCase();
          const clsName = itsMe ? classes.me : classes.user;
          return (
            <div className={`${classes.message} ${clsName}`}>
              <span className={classes.user}>{el.user}</span>
              <div className={classes.text}>{el.text}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Messages;
