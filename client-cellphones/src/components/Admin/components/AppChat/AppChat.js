import { InsertComment } from '@material-ui/icons';
import classNames from "classnames/bind";
import styles from "./AdminChat.module.scss";
import './AppChat.css';
import Chat from './Chat';
import Contact from './Contact/Contact';
const cx = classNames.bind(styles);

function AppChat() {
    return (
      <section className='container'>
        <div className={cx('Wrapper')}>
          <div className={cx('heading')}>
            <InsertComment />
            <p>Khung chat với khách hàng</p>
          </div>
          <div className={cx('Appchat')}>
            <Contact />
            <Chat />
          </div>
        </div>
      </section>
    );
}

export default AppChat;