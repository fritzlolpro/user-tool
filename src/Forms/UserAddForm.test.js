import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import UserAddForm from './UserAddForm';
import Enzyme, {shallow} from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()})

describe('UserAddForm', () => {

    const props = {
        disablePostButton: () => {
            return true
        }
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
        const component = shallow(
            <MuiThemeProvider>
                <UserAddForm {...props}/>
            </MuiThemeProvider>
        )

        expect(component).toMatchSnapshot();
    })
})