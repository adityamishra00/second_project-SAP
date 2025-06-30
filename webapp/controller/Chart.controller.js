sap.ui.define([
    "sap/ui/core/mvc/Controller",           
    "sap/viz/ui5/data/FlattenedDataset",    
    "sap/viz/ui5/controls/common/feeds/FeedItem" 
], function (Controller, FlattenedDataset, FeedItem) {
    "use strict";

    // Standard SAPUI5 way to extend your controller
    return Controller.extend("com.asint.interns.project2.controller.Chart", {

        // This function runs automatically when the page loads
        onInit: function () {
            this._createChart("bar"); // By default, show a Bar Chart when the view loads
        },

        // Reusable function to create chart based on the type (bar, line, pie)
        _createChart: function (sChartType) {
            var oVizFrame = this.byId("idVizFrame"); // Get the VizFrame control by its ID from XML view

            oVizFrame.removeAllFeeds();  // Remove previous feeds (important if user switches chart type)
            oVizFrame.setVizType(sChartType); // Set the chart type - bar, line, or pie

            var oModel = this.getView().getModel(); // Get the data model from the view

            // Define how the chart's data is structured - dimensions & measures
            var oDataset = new FlattenedDataset({
                dimensions: [{              // Dimensions appear as labels or categories
                    name: "Company Name",   // Label shown on chart
                    value: "{CompanyName}"  // Value from the OData Model
                }],
                measures: [{                // Measures are numeric values shown on chart
                    name: "Supplier ID",    // Label for the numeric value
                    value: "{SupplierID}"   // Value from OData Model
                }],
                data: {
                    path: "/Suppliers"      // Path to data source in the model
                }
            });

            oVizFrame.setDataset(oDataset); // Bind the dataset to the VizFrame
            oVizFrame.setModel(oModel);     // Attach the model to the chart

            // Special handling for Pie chart - it uses different feeds
            if (sChartType === "pie") {
                oVizFrame.addFeed(new FeedItem({
                    uid: "size",             // Size of pie slices based on measure
                    type: "Measure",         
                    values: ["Supplier ID"]  // Supplier ID determines slice size
                }));
                oVizFrame.addFeed(new FeedItem({
                    uid: "color",            // Different colors for each category
                    type: "Dimension",
                    values: ["Company Name"] // Company names determine color categories
                }));
            } else {
                // For bar and line charts - standard feeds for X and Y axis
                oVizFrame.addFeed(new FeedItem({
                    uid: "valueAxis",        // Y-axis - numeric measure
                    type: "Measure",
                    values: ["Supplier ID"]
                }));
                oVizFrame.addFeed(new FeedItem({
                    uid: "categoryAxis",     // X-axis - categories
                    type: "Dimension",
                    values: ["Company Name"]
                }));
            }

            // Styling and title of the chart
            oVizFrame.setVizProperties({
                plotArea: {
                    colorPalette: ["#5CBAE6", "#B6D957", "#FAC364"] // Set custom colors for chart elements
                },
                title: {
                    text: "Supplier Chart - " + sChartType.charAt(0).toUpperCase() + sChartType.slice(1) 
                    // Capitalize chart type and set it as chart title (e.g., Bar, Line, Pie)
                }
            });
        },

        // Handler for Bar Chart button
        onShowBarChart: function () {
            this._createChart("bar"); // Call reusable function to show bar chart
        },

        // Handler for Line Chart button
        onShowLineChart: function () {
            this._createChart("line"); // Call reusable function to show line chart
        },

        // Handler for Pie Chart button
        onShowPieChart: function () {
            this._createChart("pie"); // Call reusable function to show pie chart
        }

    });
});
