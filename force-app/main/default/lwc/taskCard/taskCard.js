import { LightningElement, api, track, wire } from 'lwc';
import saveTasks from '@salesforce/apex/TaskBoardController.saveTasks';

export default class TaskCard extends LightningElement {
    //NOTE: @api properties are immutable
    @api task;
    @track editing; // track editing status of the component
    @track currentDesc; // track saved description value
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
        }
    }

    //Basic wiring to a save method in Salesforce server
    handleSave() {
        let taskToSave = Object.assign({}, this.task, {Description: this.updatedComment});
        saveTasks({ tasks: [taskToSave] })
            .then(() => {
                console.log('Success! New description value: ' + JSON.stringify(taskToSave.Description), 'Task Id: ' + this.task.Id, );
                // update currentDesc property with value from textarea
                this.currentDesc = this.updatedComment;
                this.editing = false;
            })
            .catch(() => {
                console.log('Something went wrong...');
            })
    }

    // Getter method that checks to see if there is a value in currentDesc
    // If not, then use value from this.task.Description
    // Otherwise, use value from currentDesc
    get taskDescription() {
        return !this.currentDesc ? this.task.Description : this.currentDesc ;
    }
}