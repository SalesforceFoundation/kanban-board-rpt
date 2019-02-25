public with sharing class TaskBoardController {
    @AuraEnabled(cacheable=true)
    public static List<Task> getTasks(Id recordId) {
        return [SELECT Id, Subject, Owner.Name, ActivityDate, Description, Status FROM Task WHERE WhatId = :recordId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Task> getUpdatedTasks(Id recordId, Id taskId, String newStatus) {
        return [SELECT Id, Subject, Owner.Name, ActivityDate, Description, Status FROM Task WHERE Id = :taskId AND Status = :newStatus AND WhatId = :recordId];
    }

    @AuraEnabled
    public static List<Task> saveTasks(List<Task> tasks) {
        upsert tasks;
        return tasks;
    }
}
