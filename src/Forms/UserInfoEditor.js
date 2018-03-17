import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';

import './UserAddForm.css';

const UserInfoEditor = ({
    user,
    onEdit,
    onCancel,
    onChange,
    onSubmit,
    update
}) => {
    const onHandleSubmit = () => onSubmit(user)
    const onHandleCancel = () => onCancel()
    const onHandleChange = (e) => onChange(e)
    const isUpdated = !!!update // null to bool and reverse => disable button if nothin' to update
    return (
        <div className='user-plate'>
            <Avatar src={user.picture} size={180}/>
            <div>
            <TextField
                onChange={onHandleChange}
                name='first'
                defaultValue={user.name.first}
                floatingLabelText="First name"/>
            <br />
            <TextField
                onChange={onHandleChange}
                name='last'
                defaultValue={user.name.last}
                floatingLabelText="Last name"/>
            <br />
            <TextField
                onChange={onHandleChange}
                name='picture'
                defaultValue={user.picture}
                floatingLabelText="User avatar url"/>
            </div>
            <div className='add-controls'>
            <RaisedButton
                disabled={isUpdated}
                onClick={onHandleSubmit}
                label="Submit"
                primary={true}/>
            <FlatButton onClick={onHandleCancel} label="Cancel"/>
            </div>
        </div>
    )
}

export default UserInfoEditor
