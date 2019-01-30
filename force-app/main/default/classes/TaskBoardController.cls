public with sharing class TaskBoardController {
    @AuraEnabled(cacheable=true)
    public static List<Task> getTasks(Id recordId) {
        return [SELECT Id, Subject, Description, Status FROM Task WHERE WhatId = :recordId];
    }
}
