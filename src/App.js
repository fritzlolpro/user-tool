import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import './App.css';
import UserList from './Primary/UserList.js';
import UserAdder from './Primary/UserAdder.js';

const apiUrl = 'http://localhost:8181/';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newUsers: []
        }
    }

    setUserList = (users) => {
        this.setState({users})
    }

    callUsersApi = (options, path = '') => {
        return fetch(`${apiUrl}users${path}`, options)
    }

    handleUserListUpdate = (user) => {
        this.setState({newUsers: user})
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className="App">
                    <UserList apiCall={this.callUsersApi} newUser={this.state.newUsers}/>
                    <UserAdder
                        apiCall={this.callUsersApi}
                        handleUserListUpdate={this.handleUserListUpdate}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
