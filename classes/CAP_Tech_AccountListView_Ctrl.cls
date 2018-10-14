/**
* Author : Ashish Sharma
* Organization : Capgemini
* Date : 09/Oct/2018
* Purpose : APEX Controller of CAP_Tech_AccountListView component. Used to perform all sorts of DML and SOQL operations on Account Object.
*/
public class CAP_Tech_AccountListView_Ctrl {
    public static final Integer NO_OF_ACCOUNTS = 35;
    @AuraEnabled
    public static String getAccounts(){
        Map<Id, Account>accountsMap = new Map<Id, Account>([SELECT 
                                 Id, 
                                 Name,
                                 AccountNumber,
                                 OwnerId, 
                                 Owner.Name, 
                                 AccountSource, 
                                 ParentId, 
                                 Parent.Name, 
                                 AnnualRevenue, 
                                 Type, 
                                 CreatedById, 
                                 CreatedBy.Name, 
                                 LastModifiedById, 
                                 LastModifiedBy.Name, 
                                 Industry,
                                 Description,
                                 Phone,
                                 Fax 
                                 FROM Account ORDER BY Name DESC LIMIT : NO_OF_ACCOUNTS]);
        return JSON.serialize(accountsMap);
    }
    
    @AuraEnabled
    public static void deleteAccount(String accountId){
        if(String.isNotBlank(accountId)){
            Account acc = new Account(Id = accountId);
            delete acc;
        }
    }
    
    @AuraEnabled
    public static void deleteSelectedAccounts(String selectedIds){
        List<String>selectedIdsLst = (List<String>)JSON.deserialize(selectedIds, List<String>.class);
        List<Account>accountsToDelete = new List<Account>();
        for(String accountId : selectedIdsLst){
            accountsToDelete.add(new Account(Id = accountId));
        }
        if(accountsToDelete.size() > 0)
            delete accountsToDelete;
    }
    
    @AuraEnabled
    public static String getPicklistValues(String fieldApiName, String objectApiName){
        Map<String, String>allOpts = new Map<String, String>();
        // Get the object type of the SObject.
        Schema.sObjectType objType = Schema.getGlobalDescribe().get(objectApiName);
        
        // Describe the SObject using its object type.
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        
        // Get a map of fields for the SObject
        map < String, Schema.SObjectField > fieldMap = objDescribe.fields.getMap();
        
        // Get the list of picklist values for this field.
        list < Schema.PicklistEntry > values = fieldMap.get(fieldApiName).getDescribe().getPickListValues();
        
        // Add these values to the selectoption list.
        for (Schema.PicklistEntry pe: values) {
            if(pe.isActive())
            	allOpts.put(pe.getValue(),pe.getLabel());
        }
        return JSON.serialize(allOpts);
    }
    
    @AuraEnabled
    public static void updateSelectedAccounts(String selectedIdsJson, String accountSource){
        List<String>selectedIds = (List<String>)JSON.deserialize(selectedIdsJson, List<String>.class);
        List<Account>accounts = new List<Account>();
        for(String selectedId : selectedIds){
            accounts.add( new Account(Id = selectedId, AccountSource = accountSource));
        }
        if(accounts.size() > 0){
            update accounts;
        }
    }
}