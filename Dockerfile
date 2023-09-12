FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
ENV PORT=8080
ENV MONGODB_CNN=mongodb+srv://test:Zkz9IvkeVeNsJ6ya@cluster0.xymtth1.mongodb.net/?retryWrites=true&w=majority
ENV SENDGRID_API_KEY=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
ENV SENDGRID_FROM_EMAIL=bjaider97@gmail.com
ENV SECRET_KEY_JWT=TestSecretKey
ENV FRONT_END_URL=http://localhost:3000
CMD ["npm", "start"]
