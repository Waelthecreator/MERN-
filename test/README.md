this folder is for testing the backend api
to test the backend api, follow these steps:
1. make sure you create a .env file with the requirments from the .en-sample
2. run the command "npm run dev" in the server file
3. once app listening is logged to the console, run the DBpopulate.py python file, this will create 10 accounts with same username password and name which can be helpful for testing.
4. the other python files test the various REST api routes, some test 2 at the same time, others test the same one but for different scenarios.