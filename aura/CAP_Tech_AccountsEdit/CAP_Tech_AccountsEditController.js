({
    doInit : function(component, event, helper) {
        helper.initializeAccountsList(component);
    },
    handleNew : function(component, event, helper){
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Account"
        });
        createRecordEvent.fire();
    },
    handleNewCancel : function(component, event, helper){
        $A.util.toggleClass(component.find("newModal"), "slds-hide");
    },
    handleEdit : function(component, event, helper){
        component.set('v.selectedAccountId',event.currentTarget.dataset.recordid);
        component.set("v.loadedEditForm", true);
        window.setTimeout(
            $A.getCallback(function() {
                $A.util.toggleClass(component.find("editModal"), "slds-hide");
                component.set("v.loadedEditForm", false);
            }), 1000);   
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
    handleEditCancel : function(component, event, handler){
        $A.util.toggleClass(component.find("editModal"), "slds-hide");
    },
    handleSaveEditAccount : function(component, event, helper){
        component.find("editAccount").get("e.recordSave").fire();
    },
    viewRefreshed : function(component, event, helper){
        $A.util.toggleClass(component.find("editModal"), "slds-hide");
        //reload the view with edited account
        helper.refreshView(component);
    },
    handleDeleteModal : function(component, event, helper){
        component.set('v.selectedAccountId',event.currentTarget.dataset.recordid);
        component.set('v.selectedAccountName', event.currentTarget.dataset.recordname);
        $A.util.toggleClass(component.find("confirmDeleteModal"), "slds-hide");
    },
    handleDeleteAccount : function(component, event, helper){
        helper.deleteSelectedAccount(component, component.get('v.selectedAccountId'));
    },
    handleCancel : function(component, event, helper){
        var modalName = event.currentTarget.dataset.modalname;
        helper.cancelHandler(component, modalName);
    }
})