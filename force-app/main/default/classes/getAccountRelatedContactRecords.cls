public class getAccountRelatedContactRecords {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactRecords(Id accountId){
        system.debug('RRR accountId '+accountId);
        return [select id,FirstName,LastName, Email from Contact where AccountId =: accountId];
    }
    
     @AuraEnabled
    public static Contact createContact(Contact newContact) {
        if (newContact.AccountId == null) {
            throw new AuraHandledException('Account ID cannot be null');
            //system.debug('contact ='+newContact);
        }
        system.debug('contact ='+newContact);
        insert newContact;
        system.debug('contact ='+newContact);
        return newContact;
    }
    @AuraEnabled
    public static void deleteContact(Id contactId) {
        if (contactId == null) {
            throw new AuraHandledException('Contact ID cannot be null');
        }
        Contact contactRecord = new Contact(Id = contactId);
        delete contactRecord;
        //delete [SELECT Id FROM Contact WHERE Id = :contactId];
    }
}