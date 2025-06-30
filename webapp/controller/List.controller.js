sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/m/Link",                 
    "sap/m/Text"                  
], function (Controller, Link, Text) {
    "use strict";

    
    return Controller.extend("com.asint.interns.project2.controller.List", {

        // Runs when the View is initialized
        onInit: function () {
            var oSmartTable = this.byId("supplierTable"); // Get the SmartTable by its ID from the XML View

            // Attach logic to run when the SmartTable has initialized
            oSmartTable.attachInitialise(function () {
                var oTable = oSmartTable.getTable(); // Get the inner table from SmartTable

                if (oTable) {
                    oTable.setMode("SingleSelect"); // Disable row selection (we just want clickable links)

                    // Wait for the rows to finish rendering
                    oTable.attachUpdateFinished(function () {
                        var aItems = oTable.getItems(); // Get all rows/items from the table

                        // Loop over each row
                        aItems.forEach(function (oItem) {
                            var oCells = oItem.getCells(); // Get all cells in the row

                            // Get CompanyName and SupplierID from the row's binding context (OData model)
                            var sCompanyName = oItem.getBindingContext().getProperty("CompanyName");
                            var sSupplierID = oItem.getBindingContext().getProperty("SupplierID");

                            // Create a new Link control with CompanyName as text
                            var oLink = new Link({
                                text: sCompanyName,
                                press: this._onCompanyNamePress.bind(this, sSupplierID) 
                                // When clicked, call _onCompanyNamePress with SupplierID
                            });

                            // Replace the first cell (CompanyName Text) with the Link
                            oItem.removeCell(0);
                            oItem.insertCell(oLink, 0);
                        }.bind(this)); // Important to keep 'this' reference to the controller
                    }, this);
                }
            }, this);
        },

        // Function called when CompanyName Link is clicked
        _onCompanyNamePress: function (sSupplierID) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this); // Get the app's router

            console.log("Company Name clicked, navigating to detail for SupplierID:", sSupplierID);

            // Navigate to the Detail route, passing SupplierID as a parameter
            oRouter.navTo("Detail", {
                supplierId: sSupplierID
            });
        },

        // Function called when "Show Chart" button is clicked
        onShowChart: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this); // Get the app's router

            oRouter.navTo("Chart"); // Navigate to the Chart view
        }

    });
});
