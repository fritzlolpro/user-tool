import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import UserAdder from './UserAdder';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('UserAdder', () => {

    it('should be defined', () => {
        expect(UserAdder).toBeDefined();
    });

    it('renders without crashing'),
    () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MuiThemeProvider>
            <UserAdder/>
        </MuiThemeProvider>, div);
    }

    test('has a valid snapshot', () => {
        const component = renderer.create(
            <MuiThemeProvider>
                <UserAdder/>
            </MuiThemeProvider>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})
