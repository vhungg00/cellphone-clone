import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import classNames from "classnames/bind";
import styles from "../../AppChat.module.scss";
import moment from 'moment';

const cx = classNames.bind(styles);

function ListMessage({messages, user}) {
    const [timeMessage, setTimMessages] = useState({})
    const handleTimeMessage = useCallback((createAted, id) => {
        setTimMessages({createAted, id})
    }, [timeMessage])
    
    const handleHideTimeMessage = useCallback(() => {
        setTimMessages({})
    }, [timeMessage])

    useEffect(()=> {
        const element = document.querySelector('.ListMess');
        element.addEventListener('click', handleHideTimeMessage)
        return () => element.removeEventListener('click', handleHideTimeMessage)
    }, [timeMessage]);
    return (
        <div className={cx("ListMessage", "ListMess")}>
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
    messages: PropTypes.array,
    user: PropTypes.object
}

export default ListMessage;