# ReactTypeScriptChatApp

Step 1.	First check Node JS installed in your system or not using below command Go to cmd and type: node -v If not installed NodeJs then install node js from below link: https://nodejs.org/en/

Step 2. Install mongo db from below links https://www.mongodb.com/download-center?jmp=nav#community

Step 3. Install RoboMongo 3T below link https://robomongo.org/download

Step 4. Set mongo db environment variable Right Click on My Computer>Properties>Advance system settings >Advanced>Find and click on Environment Variables button. A new window will pop up having two sections. On the first section find a variable called "Path". Click on it and press Edit and add this ";C:\Program Files\MongoDB\Server\3.6\bin" at the end of "variable value" field. Press ok to save it.

Step 5. Open CMD and go to the Project Folder and the run below command: npm install Wait till all the required files are installed.

Step 6. Go to project folder and check if a folder with name "db" exists or not, If not exists then create a new folder with name "db".

Step 7. Connect with MongoDb database, Open cmd and go to below path C:\Program Files\MongoDB\Server\3.6\bin

Step 8. Run below command mongod.exe --dbpath "go to our project folder and inside it navigate to "db" folder path" ex. mongod.exe --dbpath "E:\ChatApplication\db"

Step 9. After executing the above command it will give message like "connection accepted"

Step 10. Run the project by typing the below command: npm run dev

Step 11. Open the browser and go to http://localhost:3000

Step 12. SignUp and start Chatting.
