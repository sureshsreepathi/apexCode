// public class accOppRec {
//     @AuraEnabled()
//     public static List<Opportunity> methodName(Id accId){
        
//         if(accId == null){
//             throw new AuraHandledException('Account id should not be null');
//         }
//         system.debug('account id' + accId);

//         List<Opportunity> oppList = [select id, Name,StageName,CloseDate,Amount,AccountId from Opportunity where AccountId =: accId ORDER BY CloseDate DESC];
//         System.debug('Fetched Opportunities: ' + oppList);
//         return oppList;
//     }
    
//     @AuraEnabled()
// public static void OpportunityStages(List<Id> opportunityIds, String newStage) {
//     if (opportunityIds == null || opportunityIds.isEmpty()) {
//         throw new AuraHandledException('No opportunities selected for update.');
//     }
//     // Fetch the opportunities with the given IDs
//     List<Opportunity> opportunitiesToUpdate = [SELECT Id, StageName FROM Opportunity WHERE Id IN :opportunityIds];
//     // If no opportunities are found, throw an exception
//     if (opportunitiesToUpdate.isEmpty()) {
//         throw new AuraHandledException('No matching opportunities found.');
//     }
//     // Loop through and update the StageName for each opportunity
//     for (Opportunity opp : opportunitiesToUpdate) {
//         opp.StageName = newStage;
//     }
//     try {
//         // Perform the update operation
//         update opportunitiesToUpdate;
//     } catch (Exception ex) {
//         throw new AuraHandledException('Failed to update opportunities: ' + ex.getMessage());
//     }
// }
// }