sap.ui.define([
    "sap/ui/model/json/JSONModel",  
    "sap/ui/Device"                
], 
function (JSONModel, Device) {      
    "use strict";

    return {
        /**
         * Provides runtime information for the device the UI5 app is running on as a JSONModel.
         * @returns {sap.ui.model.json.JSONModel} The device model.
         */
        createDeviceModel: function () {      
            var oModel = new JSONModel(Device);   // We create a JSONModel and fill it with Device data (type, OS, etc.)
            oModel.setDefaultBindingMode("OneWay"); // Set binding to OneWay - UI reflects device state but can't change it
            return oModel;                      
        }
    };

});
