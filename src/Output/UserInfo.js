import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import './UserInfo.css';

const UserInfo = ({user, onEdit, onDelete}) => {
    const onHandleEdit = () => onEdit(user.id)
    const onHandleDelete = () => onDelete(user.id)
    return (
        <div className='user-plate'>
            <Avatar className='user-pic' src={user.picture} size={180}/>
            <div>
                <p className='user-name'>{user.name.first}</p>
                <p className='user-name'>{user.name.last}</p>
            </div>

            <div className='actions-block'>
                <RaisedButton label="Edit" onClick={onHandleEdit} primary={true}/>
                <FlatButton label="Delete" onClick={onHandleDelete}/>
            </div>
        </div>
    )
}

export default UserInfo