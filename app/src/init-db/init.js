// init-db/init.js
db.createCollection("users");
db.users.insertMany([
  {
    username: "testuser",
    email: "testuser@example.com",
    password: "hashed_password_here", // Remplacez par un mot de passe chiffré
    quotaUsed: 0,
    files: []
  }
]);

db.createCollection("files");
db.files.insertMany([
  {
    filename: "example.txt",
    size: 1024,
    ownerId: ObjectId("ID_utilisateur_test"),
    metadata: {
      uploadDate: new Date(),
      contentType: "text/plain"
    }
  }
]);
