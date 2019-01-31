import { createElement } from 'lwc';
import { registerLdsTestWireAdapter } from '@salesforce/wire-service-jest-util';
import TaskBoard from 'c/taskBoard';
import getTasks from '@salesforce/apex/TaskBoardController.getTasks';

const mockGetTasks = require('./data/getTasks.json');
const getTasksWireAdapter = registerLdsTestWireAdapter(getTasks);

var element;
beforeEach(() =>{
    element = createElement('c-task-board', { is: TaskBoard });
});

// Best practice to cleanup document body after each test.
afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
});

describe('Task Board Initialization', () => {
    it('should have a lane for each task', () =>{
        document.body.appendChild(element);

        // Resolve a promise to wait for a rerender of the new content.
       return Promise.resolve().then(() => {
            const notStartedTasksLane = element.shadowRoot.querySelectorAll('.notStartedTasksLane');
            expect(notStartedTasksLane.length).toBe(1);

            const inProgressTasksLane = element.shadowRoot.querySelectorAll('.inProgressTasksLane');
            expect(inProgressTasksLane.length).toBe(1);
            
            const completedTasksLane = element.shadowRoot.querySelectorAll('.completedTasksLane');
            expect(completedTasksLane.length).toBe(1);
            
            const waitingOnSomeoneTasksLane = element.shadowRoot.querySelectorAll('.waitingOnSomeoneTasksLane');
            expect(waitingOnSomeoneTasksLane.length).toBe(1);
            
            const deferredTasksLane = element.shadowRoot.querySelectorAll('.deferredTasksLane');
            expect(deferredTasksLane.length).toBe(1);
        });
    });

    it('Each task should be in the correct lane', () =>{
        document.body.appendChild(element);

        getTasksWireAdapter.emit(mockGetTasks);

        // Resolve a promise to wait for a rerender of the new content.
        return Promise.resolve().then(() => {
            const notStartedTaskCards = element.shadowRoot.querySelectorAll('.notStartedTask');
            expect(notStartedTaskCards.length).toBe(1);

            const inProgressTaskCards = element.shadowRoot.querySelectorAll('.inProgressTask');
            expect(inProgressTaskCards.length).toBe(1);
            
            const completedTaskCards = element.shadowRoot.querySelectorAll('.completedTask');
            expect(completedTaskCards.length).toBe(2);
            
            const waitingOnSomeoneTaskCards = element.shadowRoot.querySelectorAll('.waitingOnSomeoneTask');
            expect(waitingOnSomeoneTaskCards.length).toBe(1);
            
            const deferredTaskCards = element.shadowRoot.querySelectorAll('.deferredTask');
            expect(deferredTaskCards.length).toBe(0);
        });
    });
});