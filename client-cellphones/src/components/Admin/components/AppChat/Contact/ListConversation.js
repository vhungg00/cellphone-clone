import PropTypes from 'prop-types';

import { getFirstCharacterUser } from "~/untils";

import classNames from 'classnames/bind';
import styles from '../AdminChat.module.scss';
const cx = classNames.bind(styles);

function ListConversation({conversationList, onConversation, active}) {
  return (
    <div className={cx('ListConversation')}>
      {conversationList.map((conversation) => (
        <div
          key={conversation._id}
          className={cx('item', `${active === conversation._id ? 'active' : ''}`)}
          onClick={() => onConversation(conversation)}
        >
          <div className={cx('avatar')}>{getFirstCharacterUser(conversation.nameConversation)}</div>
          <div className={cx('content')}>
            <p className={cx('name')}>{conversation.nameConversation}</p>
            <span className={cx('lastmessage')}> {conversation.lastMessage} </span>
          </div>
        </div>
      ))}
    </div>
  );
}

ListConversation.propTypes = {
  conversationList: PropTypes.array.isRequired,
  onConversation: PropTypes.func,
  active: PropTypes.string,
}

export default ListConversation;
