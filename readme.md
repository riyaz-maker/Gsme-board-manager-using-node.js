Board Game Directory
=====

The Board Game Directory is a web application designed to help friends track board games, their details, and play sessions as part of the MIE coding challenge. I've used the technologies:
•	Node.js for backend
•	EJS Templating
•	MariaDB to setup the database
•	Docker for deployment
•	GitHub actions for automated CI/CD workflow

Basic Features
=====

* Add, edit and view board game details
* Record and track game sessions

Additional Features
=====

* Export the analytics data as a CSV file
* Automated testing with Jest and Supertest
* Fully containarized using Docker Compose

Demonstration Video
=====

The solution and a demo of this project has been uploaded on Youtube. You can access the video from this [LINK](https://youtu.be/CrqbiXF24p8).

Screenshots
=====

[Homepage]![homepage](https://github.com/user-attachments/assets/4a10760c-f1a4-45c7-87cc-1f34dbdff2e8)

[Edit Game]![editgame page](https://github.com/user-attachments/assets/92003b96-acbb-4c56-b9b0-2b2bff4528be)

[Add Game]![addgame page](https://github.com/user-attachments/assets/1ea19961-4dc8-41d0-904e-bee4051bf885)

[Add Session in Game Tile]![addsession page](https://github.com/user-attachments/assets/aeea560a-db84-4c47-91ad-86e0033f23b4)

[Add Session - General]![addsession general](https://github.com/user-attachments/assets/9990dc14-4cdb-4fbf-a711-4ceeb2a5919d)

[Analytics]![analytics page](https://github.com/user-attachments/assets/28bdfcaa-af3d-49e1-9fb2-137afa27faaf)

[CSV Data]![csvdata](https://github.com/user-attachments/assets/0c128df3-b5f7-4b35-a20a-232e2b9d25b7)

Cloning the Repository
=====

* Run the following command to clone the repository: git clone https://github.com/riyaz-maker/mie-dev-challenge.git
* Make sure you have the following installed on your system:
Docker: Install Docker
* Create the .env file. Open the .env.example file in a text editor and fill in the necessary values.
* Run the following command to build and start all services: docker-compose up --build
* Open the app in your browser: http://localhost:3000
* To run the test service defined in docker-compose.yml: docker-compose up test
* To stop the services and remove containers: docker-compose down
