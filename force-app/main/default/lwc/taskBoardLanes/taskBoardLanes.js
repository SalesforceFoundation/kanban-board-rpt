import { LightningElement, api } from 'lwc';

export default class TaskBoardLanes extends LightningElement {
  @api lane;
  @api task;
}