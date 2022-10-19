# Codename Magpie (new-trial copy)

> Magpie: A bird with black and white feathers and a long tail:
>
> *Magpies* are attracted to small, shiny objects, which they carry away to their nests.

This app intends to be new and shiny, to attract the magpies.
    

# Getting Started Codename Magpie (Best CRM)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run Locally with Node and VS Code
1. Clone the repository with git clone (through command line or github desktop) into a directory you create for the app.
1. Install Node and VS Code if not already installed.
1. Open VS Code, and open the folder containing the cloned repo. (File > Open Folder ...)
1. **Backend**:
    - In the terminal window of VS Code, change directory to the 'backend' subfolder.
    - If running this for the first time since cloning the repo, type `npm install` to install dependencies. Else, go to the next step.
    - To run the backend service type `node .\app.js` and hit enter.
    
        ![image](https://user-images.githubusercontent.com/9842660/195373287-a3d0692b-e227-4373-a5bf-fa0ddde1424d.png)
1. **Client**:
    - In VS Code, open a *new* terminal window. Change directory to the 'client' subfolder.
    - **IFF** running this for the first time since cloning the repo:
        - type `npm install` to install dependencies.
        - Create a file named `.env` within the client folder as shown below
        - Add the following Environment variables
            ```
            REACT_APP_DEPLOY_ENV=trial-dev
            REACT_APP_DEPLOY_DATE=1970-01-01
            REACT_APP_VERSION=2022.x
            GENERATE_SOURCEMAP=false
            ```
            _(the most important one is REACT_APP_DEPLOY_ENV or the application will not know which Sisense environment to embed from)_
            
            ![image](https://user-images.githubusercontent.com/9842660/195378707-3f8cc015-fdf2-4edc-afa7-2700e4af1284.png)
        - Save the file.

    - To run the web application type `npm start` and hit enter.
    
        ![image](https://user-images.githubusercontent.com/9842660/195376759-f97d0d67-5f30-464a-9d64-0076a6f6e226.png)
    
    - You'll notice some output (likely some warnings too - nevermind) on the command line, and a new browser tab should open loading `http://localhost:3000`
    - If you see the output 'No Issues Found' similar to the below
    ![image](https://user-images.githubusercontent.com/9842660/195377027-90371c11-c6cf-4135-abe0-e13f0fee24c5.png)
    
    - .. then you should also see the login screen to the application in the browser
    ![image](https://user-images.githubusercontent.com/9842660/195377267-19719caa-cdf0-48c5-a6ca-a76252a5ae0a.png)

1. You are now up and runnning with a development environment
    - If you want to use a different Sisense instance, change the 'dev' configuration of SISENSE_URL and asset IDs in the file `\client\src\sisense_config.json` and save the file.
