import { LightningElement, api, track } from 'lwc';
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
                // Hack to update UI when new description is saved
                this.currentDesc = this.updatedComment;
                this.editing = false;
            })
            .catch(() => {
                console.log('Something went wrong...');
            })
    }

    @api
    newLane(newLaneStatus) {
        const currentStatus = this.task.Status;
        let taskToSave = Object.assign({}, this.task, {Status: newLaneStatus});
        saveTasks({ tasks: [taskToSave] })
            .then(() => {
                console.log('Success! New status value: ' + JSON.stringify(taskToSave));
                const selectedEvent = new CustomEvent('taskupdate', {
                    detail: { taskId: this.task.Id, oldStatus: currentStatus }
                });
                this.dispatchEvent(selectedEvent);
            })
            .catch(() => {
                console.log('Something went wrong...');
            })
    }

    handleDragStart() {
        this.dispatchEvent(new CustomEvent('dragging'));
    }

    get taskDescription() {
        return !this.currentDesc ? this.task.Description : this.currentDesc;
    }
}