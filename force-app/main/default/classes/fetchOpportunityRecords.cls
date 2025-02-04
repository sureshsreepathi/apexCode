public class fetchOpportunityRecords {
    @AuraEnabled
    public static List<Opportunity> opportunityRecords(Id accId){
        
        if(accId == null){
            throw new AuraHandledException('Account id should not be null');
        }
        system.debug('account id' + accId);

        List<Opportunity> oppList = [select id, Name,StageName,CloseDate,Amount,AccountId from Opportunity where AccountId =: accId ORDER BY CloseDate DESC];
        System.debug('Fetched Opportunities: ' + oppList);
        return oppList;
    }
    
    @AuraEnabled
    public static void updateOpportunity(List<Opportunity> opportunities) {
        
            update opportunities;
        
    }
}