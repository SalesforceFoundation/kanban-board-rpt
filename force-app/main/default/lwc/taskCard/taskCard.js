import { LightningElement, api } from 'lwc';
import saveTasks from '@salesforce/apex/TaskBoardController.saveTasks';

export default class TaskCard extends LightningElement {
    //NOTE: @api properties are immutable
    @api task

    edit() {
        console.log('enable editing here!');
    }

    //Basic wiring to a save method in Salesforce server
    save() {
        let taskToSave = Object.assign({}, this.task);
        saveTasks({ tasks: [taskToSave] })
            .then(() => {
                console.log('Success!');
            })
            .catch(() => {
                console.log('Something went wrong...');
            })
    }
}