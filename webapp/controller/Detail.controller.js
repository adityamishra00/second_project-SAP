sap.ui.define([
    "sap/ui/core/mvc/Controller" // We import the base Controller so we can extend it
], function (Controller) {
    "use strict";

    
    return Controller.extend("com.asint.interns.project2.controller.Detail", {

        // This function runs automatically when this Detail view is loaded
        onInit: function () {
            
            // Getting the app's router so we can listen for navigation events
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            // When the route named "Detail" is matched (someone navigates to it), 
            // this._onObjectMatched will run
            oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
        },

        // This function runs when the "Detail" route is triggered (after navigation)
        _onObjectMatched: function (oEvent) {
            
            // Fetching the supplierId from the URL parameter
            var sSupplierId = oEvent.getParameter("arguments").supplierId;

            // Updating the text of a control (likely a Text element) with the Supplier ID
            this.byId("companyNameText").setText("SupplierID: " + sSupplierId);
        }
    });
});


