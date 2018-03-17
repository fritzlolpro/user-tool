import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({adapter: new Adapter()})

const wrapper = shallow(<App/>);

describe('App', () => {
    it('renders without exploding', () => {
        expect(wrapper.length).toBe(1);
    });

    it('should be defined', () => {
        expect(wrapper).toBeDefined();
    });

    test('has a valid snapshot', () => {
        const component = shallow(<App/>)

        expect(component).toMatchSnapshot();

    });

})
