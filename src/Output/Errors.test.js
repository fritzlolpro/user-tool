import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ErrorText from './Errors';

describe('ErrorText', () => {

    it('should be defined', () => {
        expect(ErrorText).toBeDefined();
    });

    it('renders without crashing'),
    () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ErrorText>test error msg</ErrorText>, div);
    }

    test('has a valid snapshot', () => {
        const component = renderer.create(
            <ErrorText>test error msg</ErrorText>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})
