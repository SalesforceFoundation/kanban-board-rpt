import { LightningElement, api, track } from 'lwc';

export default class TaskBoardLanes extends LightningElement {
  @api lane;
  @api task;
}