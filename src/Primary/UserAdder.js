import React, {Component} from 'react';
import ErrorText from '../Output/Errors.js'
import UserAddForm from '../Forms/UserAddForm.js'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/social/plus-one';
import Snackbar from 'material-ui/Snackbar';
import './UserAdder.css';


class UserAdder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adding: false,
            error: false,
            newUser: {
                name: {
                    first: null,
                    last: null
                },
                picture: null
            },
            notificationOpen: false,
            notificationMessage: ''
        }
    }

    handleUserListUpdate = (user) => {
        if (!this.state.error) {
            this
                .props
                .handleUserListUpdate(user)
        }
    }

    handleNotificationsClose = () => {
        this.setState({notificationOpen: false});
    }

    inputFieldsEmpty = () => {
        // checks if some fields in user form are empty
        const lastName = !!this.state.newUser.name.last
        const firstName = !!this.state.newUser.name.first
        const picture = !!this.state.newUser.picture
        return !(lastName && firstName && picture)
    }

    callUsersApi = (options, path) => this
        .props
        .apiCall(options, path)

    onChangeField = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name
        const {newUser} = this.state || []

        if (name === 'name.first') {
            newUser.name.first = value
        }

        if (name === 'name.last') {
            newUser.name.last = value
        }

        if (name === 'picture') {
            newUser.picture = value
        }

        this.setState({newUser})

    }

    onAdding = () => {
        this.setState({error: false, adding: true})
    }

    onDismissError = () => {
        this.setState({error: false})
    }

    onCancelAdd = () => {
        this.setState({adding: false})
    }

    handleErrors = (response) => {

        if (!response.ok) {
            this.setState({error: response.statusText, notificationMessage: 'Error occurred'})
            this.setState(prevState => ({notificationOpen: true}))
        } else {
            this.setState({notificationMessage: 'User posted'})
            this.setState(prevState => ({notificationOpen: true}))
        }

        return response;
    }

    emitErrorOrSuccessOnAdd = (error) => {
        console.log(error)
        return (
            'Error occurred'
        )
    }

    postUser = () => {
        const {newUser} = this.state
        const options = {
            method: 'post',
            body: JSON.stringify(newUser)
        }

        this
            .callUsersApi(options)
            .then(response => this.handleErrors(response))
            .then(this.onCancelAdd(), this.handleUserListUpdate(newUser))
            .catch(error => this.setState({error: error.toString()}))
    }

    renderErrorMsgOrButton = (error) => {

        return (error
            ? <ErrorText onClose={this.onDismissError} error={error}>Problems while posting user
                    <br/>
                    Server says: {error}</ErrorText>
            : <FloatingActionButton
                secondary={true}
                className='icon-button'
                onClick={this.onAdding}>
                <AddIcon/>
            </FloatingActionButton>)
    }

    render() {
        // if error => show error;; show button by default, show form if addin' stuff
        const {adding, error, notificationOpen, notificationMessage} = this.state
        return (
            <div className='adding-widget'>
            {adding
            ? <UserAddForm
                    cancel={this.onCancelAdd}
                    post={this.postUser}
                    onChange={this.onChangeField}
                    disablePostButton={this.inputFieldsEmpty}/>
            : <div>
                {this.renderErrorMsgOrButton(error)}
                <Snackbar
                    open={notificationOpen}
                    message={notificationMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleNotificationsClose}/>
            </div>}
            </div>
            )
    }
}

export default UserAdder