<template>
  <v-container fluid>
    <h2>Project Description</h2>

    <p class="text-justify">
        
        Purpose of this demonstrator is to validate system driven KPI calculations in an automotive Tier1 environment with forecast and actual data.</p>

    <h2>Scope</h2>
    <p class="text-justify">
        This demo is designed to run for 1 month and 1 part in order to reduce complexity.
        Inputs are sales price by reason code, vehicles with installation rate (IRate) assumptions and a direct part volume entry option for forecast and actual.
        Base Price is the intial starting price at SOP (start of production) and other reason codes are price changes either decreasing or increasing the sales price.
        A calculator breaks total sales down by sales accounts. The sales accounts are tied to the reason codes. Base Price => Sales, LTA=> Sales_LTA. 
        Netsales is the sum of all price entries. A calculator also computes variances between actual and forecast by reason code and vehicle status. 
        Outputs are displayed on the GOM/YOY Report.
    </p>

    <h2>Code on <a href="https://github.com/FrankHalbach/gom#gom">github.com</a></h2>
    
    


  </v-container>
</template>
