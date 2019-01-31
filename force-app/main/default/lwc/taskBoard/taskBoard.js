import { LightningElement, api, wire, track } from 'lwc';
import getTasks from '@salesforce/apex/TaskBoardController.getTasks';

export default class TaskBoard extends LightningElement {
    //Allows the component to be aware of the ID of the record (i.e. the Account)
    //that it is embedded on
    @api recordId;

    @track notStartedTasks = [];
    @track inProgressTasks = [];
    @track completedTasks = [];
    @track waitingOnSomeoneTasks = [];
    @track deferredTasks = [];
    
    @wire(getTasks, { recordId: '$recordId' })
    processTasks({ error, data }) {
        //Seems repetitive, is there a better way to do this?
        if (data) {
            data.forEach(element => {
                if (element.Status === 'Not Started') {
                    this.notStartedTasks.push(element);
                }
                else if (element.Status === 'In Progress') {
                    this.inProgressTasks.push(element);
                }
                else if (element.Status === 'Completed') {
                    this.completedTasks.push(element);
                }
                else if (element.Status === 'Waiting on someone else') {
                    this.waitingOnSomeoneTasks.push(element);
                }
                else if (element.Status === 'Deferred') {
                    this.deferredTasks.push(element);
                }
            });
            this.record = data;
        } else if (error) {
            console.log(error);
        }
    }
}