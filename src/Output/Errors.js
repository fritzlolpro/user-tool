import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import './Errors.css';

const ErrorText = ({error, children, onClose}) => {
    const onHandleClose = () => onClose()
    return (!!error && <div className='error-wrapper'>
        <Paper className='error-card'>
            {children}
            <FlatButton className='button-dismiss' onClick={onHandleClose} label='Dismiss'/>
        </Paper>
    </div>)
}

export default ErrorText