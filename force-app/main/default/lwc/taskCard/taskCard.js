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
        this.editing = false;
    }

    handleDescChange(event) {
        if (this.editing) {
            this.updatedComment = event.detail.value;
        }
    }

    //Basic wiring to a save method in Salesforce server
    handleSaveDesc() {
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

    @api
    newLane(newLaneStatus) {
        // console.log("NEW LANE: " + newLaneStatus);
        let taskToSave = Object.assign({}, this.task, {Status: newLaneStatus});
        saveTasks({ tasks: [taskToSave] })
            .then(() => {
                console.log('Success! New status value: ' + JSON.stringify(taskToSave));
                // update currentDesc property with value from textarea
                // this.currentDesc = this.updatedComment;
            })
            .catch(() => {
                console.log('Something went wrong...');
            })
    }

    handleDragStart() {
        // console.log(event.currentTarget);
        // event.currentTarget.parentNode('<c-task-card>').classList.add('moving-task');
        this.dispatchEvent(new CustomEvent('dragging'));
    }

    get taskDescription() {
        return !this.currentDesc ? this.task.Description : this.currentDesc;
    }
}