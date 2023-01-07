import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import classNames from "classnames/bind";
import styles from "../AdminChat.module.scss";
const cx = classNames.bind(styles);

function ListMessage({messages, user, loading}) {
    const [timeMessage, setTimMessages] = useState({})
    const handleTimeMessage = useCallback((createAted, id) => {
        setTimMessages({createAted, id})
    }, [timeMessage])
    
    const handleHideTimeMessage = useCallback(() => {
        setTimMessages({})
    }, [timeMessage])

    useEffect(()=> {
        const element = document.querySelector('.GetAdBox');
        element.addEventListener('click', handleHideTimeMessage)
        return () => element.removeEventListener('click', handleHideTimeMessage)
    }, [timeMessage]);
    return (
        <div className={cx("ListMessage", "ListMess")}>
            <div className={cx("Loading")}>
                {loading && <span>Vui lòng chờ...</span>}
            </div>
            {messages.map(message => (
            <div
             key={message._id}
             className={cx("message",`${user.name === message.sender ? 
             'me' : 
             'message'}`)}
             onClick={() => handleTimeMessage(message.createdAt, message._id)}
            >   
                <span>{ timeMessage.id === message._id ?  moment(timeMessage.createAted).format("LT") : ''}</span>
                <p>{message.message}</p>
            </div>))}
        </div>
    );
}

ListMessage.propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default ListMessage;