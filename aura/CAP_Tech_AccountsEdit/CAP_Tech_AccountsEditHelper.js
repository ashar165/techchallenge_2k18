({
    initializeAccountsList : function(component){
        var action = component.get("c.getAccounts");
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var accountsMap = JSON.parse(response.getReturnValue());
                var accounts = [];
                for(var key in accountsMap){
                    accounts.push(accountsMap[key]);
                }
                component.set("v.accounts", accounts);
            }
        });
        $A.enqueueAction(action);
    },
    deleteSelectedAccount : function(component, accountId){
        var action = component.get("c.deleteAccount");
        action.setParams({
            "accountId" : accountId
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                $A.util.toggleClass(component.find("confirmDeleteModal"), "slds-hide");
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Deleted.',
                    message: 'Account '+component.get('v.selectedAccountName')+' deleted successfully.',
                    messageTemplate: 'Record deleted.',
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
                this.refreshView(component);
            }else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'There is some issue while deleting this account.',
                    messageTemplate: 'There is some issue while deleting this account.',
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'dismissible'
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
    refreshView : function(component){
        $A.get("e.force:refreshView").fire();
    },
    cancelHandler : function(component, modalName){
        $A.util.toggleClass(component.find(modalName),'slds-hide');
    }
})