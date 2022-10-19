FROM node:latest

LABEL description="Backend for the BestCRM Demo Application. This application is used to demonstrate Sisense. The backend is required to handle SSO, etc."

WORKDIR /app

COPY ["./package.json", "./package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .

EXPOSE 5000

CMD ["node", "./app.js"]