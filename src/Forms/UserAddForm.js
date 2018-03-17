import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import './UserAddForm.css';
import styles from '../Primary/UserList.css';


const UserAddForm = ({post, cancel, onChange, disablePostButton}) => {
    const onHandlePost = () => post()
    const onHandleChange = (e) => onChange(e)
    const onHandleCancel = () => cancel()
    const disable = disablePostButton()
    return (
        <Paper className='standart-card' zDepth={4}>
        <div className='add-user-wrapper'>
            <p className='info-text'>Add new user here
                <br/>
                All fields are reqiured</p>
            <div>
                <TextField
                    className='input-fields'
                    onChange={onHandleChange}
                    name='name.first'
                    floatingLabelText='User first name'/>
                <br/>
                <TextField
                    className='input-fields'
                    onChange={onHandleChange}
                    name='name.last'
                    floatingLabelText='User last name'/>
                <br/>
                <TextField
                    className='input-fields'
                    onChange={onHandleChange}
                    name='picture'
                    floatingLabelText='Url to user picture'/>
            </div>
            <div className='add-controls'>
                <RaisedButton
                    label="Post User"
                    disabled={disable}
                    primary={true}
                    onClick={onHandlePost}/>

                <FlatButton label="Cancel" onClick={onHandleCancel}/>
            </div>
            </div>
        </Paper>
    )
}

export default UserAddForm