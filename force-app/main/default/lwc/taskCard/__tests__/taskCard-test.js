import { createElement } from 'lwc';
import TaskCard from 'c/taskCard';

// Best practice to cleanup document body after each test.
afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
});

describe('Task Board Initialization', () => {
    it('should display task', () => {
        let element = createElement('c-task-board', { is: TaskCard });
        element.task = {
            "Id": "00T0S000006T6kdUAC",
            "Subject": "A Task Subject",
            "OwnerId": "0050S000001cR9MQAU",
            "ActivityDate": "2019-01-16",
            "Description": "A description of the task",
            "Status": "Completed",
            "Owner": {
                "Name": "User Name",
                "Id": "0050S000001cR9MQAU"
            }
        };

        document.body.appendChild(element);
        const ownerNameOutput = element.shadowRoot.querySelector('.ownerName');
        expect(ownerNameOutput.textContent).toBe('User Name');

        const dueDateOutput = element.shadowRoot.querySelector('.dueDate');
        expect(dueDateOutput.textContent).toBe('2019-01-16');

        const descriptionOutput = element.shadowRoot.querySelector('.description');
        expect(descriptionOutput.textContent).toBe('A description of the task');
    });
});