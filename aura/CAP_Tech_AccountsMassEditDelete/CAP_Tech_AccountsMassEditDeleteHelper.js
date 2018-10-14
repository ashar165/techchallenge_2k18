({
    initializeAccountsList : function(component){
        var action = component.get("c.getAccounts");
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var accountsMap = JSON.parse(response.getReturnValue());
                component.set("v.accountsMapJson", response.getReturnValue());
                var accounts = [];
                for(var key in accountsMap){
                    accounts.push(accountsMap[key]);
                }
                component.set("v.accounts", accounts);
            }
        });
        $A.enqueueAction(action);
    },
    getPicklistValuesHandler : function(component){
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "fieldApiName" : "AccountSource",
            "objectApiName" : "Account"
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var fieldMap = JSON.parse(response.getReturnValue());
                var accountSourceMap = [];
                for(var key in fieldMap){
                    accountSourceMap.push({value:fieldMap[key], key:key});
                }
                component.set("v.accountSourceMap", accountSourceMap);
                console.log(accountSourceMap);
            }
        });
        $A.enqueueAction(action);
    },
    deleteSelected : function(component, selectedIds) {
        var action = component.get("c.deleteSelectedAccounts");
        action.setParams({
            "selectedIds" : JSON.stringify(selectedIds)
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){             
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Deleted',
                    message: 'Accounts deleted successfully.',
                    messageTemplate: 'Records deleted.',
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'success',
                    mode: 'dismissible'
                });
                toastEvent.fire();
                this.refreshView(component);
            }else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'There is some issue while deleting selected accounts.',
                    messageTemplate: 'There is some issue while deleting selected accounts.',
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
    },
    handleSelect : function(component){
        var checkCmp = component.find("checkbox");
        var accountsMap = JSON.parse(component.get("v.accountsMapJson"));
        var selectedIds = [];
        var selectedNames = [];
        for(var i = 0; i < checkCmp.length; i++){
            if(checkCmp[i].get("v.value")){
                selectedIds.push(checkCmp[i].get("v.name"));
                selectedNames.push(accountsMap[checkCmp[i].get("v.name")].Name);
            }
        }
        component.set("v.selectedAccountIds",selectedIds);
        component.set("v.selectedAccountNames",selectedNames);
        if(selectedIds.length > 0)
            return true;
        else{
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : 'Select Account',
                message: 'Please select atleast one record.',
                messageTemplate: 'Please select atleast one record.',
                duration:' 7000',
                key: 'info_alt',
                type: 'info',
                mode: 'dismissible'
            });
            toastEvent.fire();
        }
        return false;
    },
    updateAccountsHandler : function(component){
        var action = component.get("c.updateSelectedAccounts");
        action.setParams({
            "selectedIdsJson" : JSON.stringify(component.get("v.selectedAccountIds")),
            "accountSource" : component.get("v.selectedAccountSource")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                $A.util.toggleClass(component.find('updateAccountSourceModal'),'slds-hide');
                this.refreshView(component);
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Accounts Updated',
                    message: 'Selected Accounts updated successfully.',
                    messageTemplate: 'Selected Accounts updated successfully.',
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'success',
                    mode: 'dismissible'
                });
                toastEvent.fire();
            }else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'There is some issue while updating selected accounts.',
                    messageTemplate: 'There is some issue while updating selected accounts.',
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'dismissible'
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    }
})