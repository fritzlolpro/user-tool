import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import UserInfoEditor from './UserInfoEditor';
import Enzyme, {shallow} from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()})

describe('UserInfoEditor', () => {

    it('should be defined', () => {
        expect(UserInfoEditor).toBeDefined();
    });

    it('renders without crashing'),
    () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MuiThemeProvider>
            <UserInfoEditor/>
        </MuiThemeProvider>, div);
    }

    test('has a valid snapshot', () => {
        const component = shallow(
            <MuiThemeProvider>
                <UserInfoEditor/>
            </MuiThemeProvider>
        )

        expect(component).toMatchSnapshot();
    })
})