# ML technical challenge 

Requirements: 
* Visual Studio Code IDE with REST Client extension installed for send htttp requests on VSC
* Node.js v22.11.0 and npm v10.9.0 installed

Instructions to run the program:
*  Clone this repository. Run in your terminal the command "git clone https://github.com/dgminos/meli-mutant-rest-api-db.git"
*  Open the cloned project root folder in Visual Studio Code
*  In your terminal run the command "npm install" to install dependencies
*  Run the command "node --watch index.js" to let Node.js watching for changes in your code so it can restart the server once you save your changes
*  In "requests.http" file you'll find all the http's requests to test get and post data. Click over "Send Request" in each one to see data in each endpoint aside
  in Visual Studio Code. To send another http post request you can change the values on a string in the dna JSON array to see if a dna is mutant's or human's
* To see stats add the endpoint "/stats" to the deployed base URL https://meli-mutant-api.onrender.com/ (https://meli-mutant-api.onrender.com/stats)
