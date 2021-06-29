                         MVC NodeJS,Mongoose,Express Project


supported version of nodejs-15.13.0
supported version of mongoose-4.0

This is a template of Web application, developed using MVC pattern with Node.js, ExpressJS, and Mongoose ODM. 
Basic boilerplate for web applications, built on Express.js using the Model–View–Controller architectural pattern.
The views are created with the Embedded JavaScript templating (EJS) view engine.
A MongoDB database is used for data storage, with object modeling provided by Mongoose.

# initial
- Configure a basic server in app.js.
- Organize the routes with Express Router.
- Use the mainRoutes in app as middleware.
- Set a final use after the routes, to display a 404 message for the unhandled requests.

1.Install needed Node.js modules:
     
     $ npm install
2.execute server:
     
     $ npm start	

# folder structure:

     --project
       --project_folder
               --config
               --controller
               --jobs
               --logs
               --middleware
               --model
               --postman
               --public
               --routes
               --services
               --utils
               --views
               --app.js
       --project_folder.zip

# app.js
- entry point of application.

# config
- passport straregy for all plateforms.
- based on authmodel,authentication files are been generated.
- constanst file(static files).
- Use environment variables and configure the db connection string in a private file.

# controller
- includes all plateform
- as per the plateform permission for crud operation model based seprate files are generated in specific folder.

     	  -controller
     	        -admin
     	          -modelController.js
     	        -device
     	          -modelController.js
     	        -desktop
     	          -modelController.js
     	        -client
     	          -modelController.js
     

# jobs
- cron jobs


# logs
- logs files generated


# middleware
- add validation of users based on roles and permissions
- policies


# models
- in the models folder, configure the all models.


# postman
- json file presented,which includes json dummy data.
- import in postman and test.

# public 
- includes all assets like images, pdf etc.
 

# routes
- based on plateform,seperate folder is generated,within those folders model wise route files generated
- index.js file, main file which includes all platform routes.
- add index files in app.js.


# services

     	-jobs
       		-cron job services
      
     	-auth.js
       		-generate jwt token
       		-in auth.js checks the validaty of users while registration,that email is used or not or password is in proper formate or not.


# utils
	     -validation
     		   -add joi validations files.
     		   -files are seperated by models.
     
     	 -common.js
       		   -converted object to enum function.
     
     	 -dbService.js
       		 -add common db functionalities
     	  	 -getAllDocuments(find all documents)
     	  	 -updateDocuments(update single documents in db)
     	  	 -deleteDocuments(delete single documents in db)
     	  	 -createDocuments(create single documents in db)
     	  	 -getDocumentByQuery(find single document)
			 -getSingleDocumentById(find by id)
     	  	 -softDelete
     	  	 -findExistData
     	  	 -bulkInsert(insert multiple documents in db)
     	  	 -bulkUpdate(update multiple documents in db)
     	  	 -countDocument
     
     	 -messages.js
  		     -display static messages

	      -responseCode.js
  		     -codes for responses

	      -validateRequest.js
  		     -validate schema based on joi validation


# views
- add ejs files


 


 

 
