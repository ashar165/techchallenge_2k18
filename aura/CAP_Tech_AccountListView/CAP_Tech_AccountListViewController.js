({
    doInit : function(component, event, helper) {
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
    showAccDetails : function(component, event, helper){
        var selectedAccountId = event.currentTarget.dataset.recordid
        var accounts = component.get("v.accounts");
        for(var i = 0; i < accounts.length; i++){
            if(selectedAccountId == accounts[i].Id){
                component.set("v.selectedAccount", accounts[i]);
                break;
            }
        }
    }
})