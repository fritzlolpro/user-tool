import React, {Component} from 'react';
import UserInfoEditor from '../Forms/UserInfoEditor.js'
import UserInfo from '../Output/UserInfo.js'
import ErrorText from '../Output/Errors.js'
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import './UserList.css';

export default class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: null,
            update: null,
            users: [],
            error: false,
            notificationOpen: false,
            notificationMessage: ''
        }

    }

    callUsersApi = (options, path) => this
        .props
        .apiCall(options, path)

    setUserList = (users) => {
        this.setState({users})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newUser !== this.props.newUser) {
            this.getUsersFromServer()
        }

    }

    handleNotificationsClose = () => {
        this.setState({notificationOpen: false});
    }

    handleErrors = (response) => {
        if (!response.ok) {
            this.setState({error: response.statusText})
        }

        return response;
    }

    onDismissError = () => {
        this.setState({error: false})
    }

    getUsersFromServer() {
        this
            .callUsersApi()
            .then(response => this.handleErrors(response))
            .then(blob => blob.json())
            .then(users => this.setUserList(users))
            .catch(error => this.setState({
                error: error.toString()
            }))
    }

    componentDidMount() {
        this.getUsersFromServer()
    }

    renderUserOrUserEditor(user) {
        if (this.state.editing === user.id) {
            // render editor for respectin' user use dull key for initial render
            return (
                <Paper key={user.id || 1} className='standart-card user-card' zDepth={3}>
                    <UserInfoEditor
                        user={user}
                        update={this.state.update}
                        onChange={this.onChangeField}
                        onSubmit={this.onSubmitField}
                        onCancel={this.onCancelChangeField}/>
                </Paper>
            )
        } else {
            // render user component
            return (
                <Paper key={user.id || 1} className='standart-card user-card'>
                    <UserInfo user={user} onEdit={this.onEdit} onDelete={this.onDelete}/>
                </Paper>
            )
        }

    }

    onEdit = (id) => {
        this.setState({editing: id})
    }

    onDelete = (id) => {

        const options = {
            method: 'delete'
        }

        this
            .callUsersApi(options, `/${id}`)
            .then(this.setUserList(this.generateShrinkedUsersList(id)), this.setState({notificationMessage: 'The user has been deleted'}), this.setState(prevState => ({notificationOpen: true})))
    }

    onChangeField = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name
        const {update} = this.state || []
        this.setState({
            update: {
                ...update,
                [name]: value
            }

        })
    }

    generateShrinkedUsersList = (deletedUserId) => {
        // if some user was deleted, delete him from list
        const {users} = this.state
        const isNotDeletedUser = user => user.id !== deletedUserId
        return users.filter(isNotDeletedUser)
    }

    genrateUpdatedUserList = (newUserData) => {
        // if some user info was changed we can figure what and then update user list
        const {users} = this.state
        return users.map(x => {
            if (x.id === newUserData.id) {
                return (x = {
                    ...newUserData
                })
            } else {
                return x
            }

        })
    }

    onSubmitField = (user) => {
        const {update} = this.state
        const data = {
            id: user.id,
            name: {
                first: update && update.first
                    ? update.first
                    : user.name.first,
                last: update && update.last
                    ? update.last
                    : user.name.last
            },
            picture: update && update.picture
                ? update.picture
                : user.picture
        }

        const options = {
            method: 'put',
            body: JSON.stringify(data)
        }

        this
            .callUsersApi(options, `/${user.id}`)
            .then(response => this.handleErrors(response))
            .then(this.onCancelChangeField(), this.setUserList(this.genrateUpdatedUserList(data)), this.setState({notificationMessage: 'The user has been edited'}), this.setState(prevState => ({notificationOpen: true})))
            .catch(error => this.setState({
                error: error.toString()
            }))
    }

    onCancelChangeField = (e) => {
        this.setState({editing: null, update: null})
    }

    render() {
        const {users, error, notificationOpen, notificationMessage} = this.state;

        const list = users || []
        return <div className='list-wrapper'>
            {error
                ? <ErrorText onClose={this.onDismissError} error={error}>Problems while recieving user list
                        <br/>
                        Server says: {error}</ErrorText>
                : list.map(user => this.renderUserOrUserEditor(user))}

            <Snackbar
                open={notificationOpen}
                message={notificationMessage}
                autoHideDuration={4000}
                onRequestClose={this.handleNotificationsClose}/>
        </div>
    }
}
