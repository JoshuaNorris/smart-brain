This app was completed in the ZTM courses on Web Development.

It is currently live at this link
https://joshuanorris.github.io/smart-brain/
using Github pages to host the front end (this current repo)

The backend is hosted using heroku and the repo is here
https://github.com/JoshuaNorris/smart-brain-api

This project has account functionality that uses a Postgresql database to store a user's
information and bcrypt to keep a user's password safely.

It utilizes React on the frontend and NodeJS and ExpressJS on the backend.

Once a user logs in they can give the website a link to an image and the website
will display that image and identify one of the faces in the image (next feature
will be to have it identify all faces) and display a box around the faces.

It does this by utilizing Clarifai's face recognition API (which is used in a RESTful way)