import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import UserInfo from './UserInfo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('UserInfo', () => {
    const props = {
        user: {
            id: 123,
            name: {
                first: 'TestFirst',
                last: 'TestLast'
            },
            picture: 'https://randomuser.me/api/portraits/men/83.jpg'
        }
    }
    it('should be defined', () => {
        expect(UserInfo).toBeDefined();
    });

    it('renders without crashing'),
    () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MuiThemeProvider>
            <UserInfo {...props}/>
        </MuiThemeProvider>, div);
    }

    test('has a valid snapshot', () => {
        const component = renderer.create(
            <MuiThemeProvider>
                <UserInfo {...props}/>
            </MuiThemeProvider>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})
