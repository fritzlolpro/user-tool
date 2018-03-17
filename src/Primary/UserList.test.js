import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import UserList from './UserList';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('UserList', () => {

    const mockCall = () => {
        return new Promise((resolve, reject) => {
            resolve(jest.fn())
        })
    }
    const props = {
        users: [
            {
                id: 123,
                name: {
                    first: 'TestFirst',
                    last: 'TestLast'
                },
                picture: 'https://randomuser.me/api/portraits/men/83.jpg'
            }, {
                id: 56,
                name: {
                    first: 'TestFirst2',
                    last: 'TestLast2'
                },
                picture: 'https://randomuser.me/api/portraits/men/33.jpg'
            }
        ],
        apiCall: () => mockCall()

    }

    it('should be defined', () => {
        expect(UserList).toBeDefined();
    });

    it('renders without crashing'),
    () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MuiThemeProvider>
            <UserList {...props}/>
        </MuiThemeProvider>, div);
    }

    test('has a valid snapshot', () => {
        const component = renderer.create(
            <MuiThemeProvider>
                <UserList {...props}/>
            </MuiThemeProvider>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})