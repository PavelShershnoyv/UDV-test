import { Link } from "react-router-dom";
import classes from "../NotFoundPage/NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <p>Такой комнаты нет, создайте её при входе</p>
        <Link to="/">
          <button className={classes.btn}>Вход</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
