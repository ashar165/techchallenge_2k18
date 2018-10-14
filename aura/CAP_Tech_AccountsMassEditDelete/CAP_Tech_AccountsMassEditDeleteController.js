({
    doInit : function(component, event, helper) {
        helper.initializeAccountsList(component);
        helper.getPicklistValuesHandler(component)
    },
    handleDeleteModal : function(component, event, helper){
        if(helper.handleSelect(component))
            $A.util.toggleClass(component.find('confirmDeleteModal'),'slds-hide');
    },
    handleDeleteAccounts: function(component, event, helper) {
        var selectedAccountIds = component.get("v.selectedAccountIds");
        helper.deleteSelected(component,selectedAccountIds);
    },
    updateAccountSourceModal : function(component, event, helper){
        if(helper.handleSelect(component))
            $A.util.toggleClass(component.find('updateAccountSourceModal'),'slds-hide');
    },
    handleCancel : function(component, event, helper){
        var modalName = event.currentTarget.dataset.modalname;
        helper.cancelHandler(component, modalName);
    },
    handleUpdateAccounts : function(component, event, helper){
        helper.updateAccountsHandler(component);
    },
    navigateToAccount : function(component, event, helper){
        console.log('navigateToAccount ',event.currentTarget.dataset.recordid);
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": event.currentTarget.dataset.recordid,
            "slideDevName": "detail"
        });
        navEvt.fire();
    },
})