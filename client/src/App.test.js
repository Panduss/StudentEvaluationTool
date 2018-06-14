import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import { selectStudent } from './components/batches/randomStudentGenerator.jsx'
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


describe('selectStudent', () => {
  const test = [
      { firstName: 'student1', lastEvaluation: 'green' },
      { firstName: 'student2', lastEvaluation: 'green' },
      { firstName: 'student3', lastEvaluation: 'green' },
      { firstName: 'student4', lastEvaluation: 'yellow' },
      { firstName: 'student5', lastEvaluation: 'yellow' },
      { firstName: 'student6', lastEvaluation: 'yellow' },
      { firstName: 'student7', lastEvaluation: 'red' },
      { firstName: 'student8', lastEvaluation: 'red' },
      { firstName: 'student9', lastEvaluation: 'red' },
    ]
  it('returns defined', () => {
    expect(selectStudent(test)).toBeDefined()
  })
})

  describe('selectStudent', () => {
    const test = [
        { firstName: 'student1', lastEvaluation: 'green' },
        { firstName: 'student2', lastEvaluation: 'green' },
        { firstName: 'student3', lastEvaluation: 'green' },
        { firstName: 'student4', lastEvaluation: 'green' },
        { firstName: 'student5', lastEvaluation: 'green' },
        { firstName: 'student6', lastEvaluation: 'green' },
        { firstName: 'student7', lastEvaluation: 'green' },
        { firstName: 'student8', lastEvaluation: 'red' },
        { firstName: 'student9', lastEvaluation: 'red' },
      ]
    it('returns defined', () => {
      expect(selectStudent(test)).toBeDefined()
    })
  })

  describe('selectStudent', () => {
    const test = [
        { firstName: 'student1', lastEvaluation: 'yellow' },
        { firstName: 'student2', lastEvaluation: 'yellow' },
        { firstName: 'student3', lastEvaluation: 'yellow' },
        { firstName: 'student4', lastEvaluation: 'yellow' },
        { firstName: 'student5', lastEvaluation: 'yellow' },
        { firstName: 'student6', lastEvaluation: 'yellow' },
        { firstName: 'student7', lastEvaluation: 'yellow' },
        { firstName: 'student8', lastEvaluation: 'red' },
        { firstName: 'student9', lastEvaluation: 'red' },
      ]
    it('returns defined', () => {
      expect(selectStudent(test)).toBeDefined()
    })
  })


