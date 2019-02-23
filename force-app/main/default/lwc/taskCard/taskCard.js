import { LightningElement, api, track } from 'lwc';
import saveTasks from '@salesforce/apex/TaskBoardController.saveTasks';
import DESCRIPTION from '@salesforce/schema/Task.Description';

export default class TaskCard extends LightningElement {
    //NOTE: @api properties are immutable
    @api task;
    @track editing; // track editing status of the component
    updatedComment; // Store new comment; no need to track since its not reactive

    handleEdit() {
        this.editing = true;
    }

    handleCancel() {
        // close the textarea field without saving
        this.editing = false;
    }

    handleDescChange(event) {
        if (this.editing) {
            this.updatedComment = event.detail.value;
            // console.log(this.updatedComment);
        }
    }

    //Basic wiring to a save method in Salesforce server
    handleSave() {
        let taskToSave = Object.assign({}, this.task, {Description: this.updatedComment});
        saveTasks({ tasks: [taskToSave] })
            .then(() => {
                console.log('Success!', JSON.stringify(taskToSave.Description));
                console.log('New task: ' + JSON.stringify(this.task.Description));
                this.editing = false;
            })
            .catch(() => {
                console.log('Something went wrong...');
            })
    }
}