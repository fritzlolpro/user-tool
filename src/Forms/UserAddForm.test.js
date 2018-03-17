import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import UserAddForm from './UserAddForm';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('UserAddForm', () => {

    const props = {
       disablePostButton: () =>{ return false }
    }

    it('should be defined', () => {
        expect(UserAddForm).toBeDefined();
    });

    it('renders without crashing'),
    () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MuiThemeProvider>
            <UserAddForm {...props}/>
        </MuiThemeProvider>, div);
    }

    test('has a valid snapshot', () => {
        const component = renderer.create(
            <MuiThemeProvider>
                <UserAddForm {...props}/>
            </MuiThemeProvider>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})