// Import packages
const express = require("express");
const home = require("./routes/home");
const { Database } = require("arangojs");

const port = 3001;

// Middlewares
const app = express();
app.use(express.json());

const db = new Database({
  url: "https://92ac4680fb78.arangodb.cloud:18529",
  // databaseName: "<DATABASE_NAME>",
  auth: { username: "root", password: "yMfTVSAyJhqzjII2jtwB" },
  agentOptions: {
    ca: Buffer.from(
      "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURHRENDQWdDZ0F3SUJBZ0lRWGxzQzZwU0laUlRBbmpGak1XM2R6ekFOQmdrcWhraUc5dzBCQVFzRkFEQW0KTVJFd0R3WURWUVFLRXdoQmNtRnVaMjlFUWpFUk1BOEdBMVVFQXhNSVFYSmhibWR2UkVJd0hoY05Nak13TmpFMApNVEExTURJMFdoY05Namd3TmpFeU1UQTFNREkwV2pBbU1SRXdEd1lEVlFRS0V3aEJjbUZ1WjI5RVFqRVJNQThHCkExVUVBeE1JUVhKaGJtZHZSRUl3Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLQW9JQkFRQ3oKMDgybGd4ZUpqcGNFbVU1WnltMmZpWS9DaWU1YkRLUG83TTlXbk5KOGxXTnlXR1NPQUFhRmlHMU1wRytTTWw2bgpzR0xDSVpOb2duRXZyVmo1T0ttZ3IvUGZtZkpTVVo2ZWUxbVgzbWhqbGhOdDhjd3ZhamhDNm9IT2lCQWRxQXptClhPSTZtV2tGVU1tWjVPUFNkd08xYTZtMkNLeHluTEhhQkRpeWFOSXpTN29YdGpZaWgzR0FxMWRnZUU5NGRhV0MKN2IvWmhsN0VsZ0c0UHp4aENJdnBzYlFsRmFVMWYrRDFhcTZteUw4Y1F6MjZ6TnVROUtSZmdCUGVZYXV1Z0NhMApLQVE1dXBFSGdweHErc2Ntam13cjFTNTRoQ2MzUGIyNG45WkJwTkxuRE9SZThpSnR0dGpJa3NTblFRbVNIZjdXCjQ4U3BUZlg4NERXd0tJUkltNmtCQWdNQkFBR2pRakJBTUE0R0ExVWREd0VCL3dRRUF3SUNwREFQQmdOVkhSTUIKQWY4RUJUQURBUUgvTUIwR0ExVWREZ1FXQkJRRURodmJSRDRsWlN0VkJ6UVdzU2dHSWNGeUx6QU5CZ2txaGtpRwo5dzBCQVFzRkFBT0NBUUVBZ1owMlh0RUN0OHRNT0xic21yTllQWGZJOWNLS3dpM0JiT2NxSDNhb2hGSWdZWkZwCmYzdkdUaEhmVWVzY092T0VYbVgrR1k5UFQ4MUpqSXNUUGhtWTlqQ3dTaE14Zm83SU1NOUpSMHFGNHQ5RE0zTWkKZ0ZqaU9JL0NFc3JhMTU3VXgyN1hRNitRaHIrSms5Y1dxdUViOU12QzNsdWt2R0VvSkFSMmNCU2tKdEZDMnFlMwptbUducDJMU2pOMDI2RFlmclNiT3cwYXhrcEpQR0F1SjgyUm42RFRBREV2RGE0OGgwUWtsT3hFOFZubEVmZi8yCmhFV0JQSzZJSW5iWnBQNk5jTzNHWjVOTG1JY1l4WTkvK0poWG1HbEM3cE5QSUFIZjdjNlVuWkEwSk52NHlBSTYKN25OR0VuU2wwb0p0Sy83cm1qMTAwdG5IYjBhNUYrbm1nMkFISmc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==",
      "base64"
    ),
  },
});

// Test the connection
db.version()
  .then((version) => console.log("Connected to ArangoDB version:", version))
  .catch((error) => console.error("Failed to connect to ArangoDB:", error));

app.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

app.get("/get", async (req, res) => {
  try {
    // Perform ArangoDB operations using the db object
    const collection = await db.collection("firstCollection");
    const cursor = await collection.all();

    // Extract necessary information from the documents
    const documents = [];
    await cursor.forEach((document) => {
      documents.push({
        // document
        key: document.Name,
        value: document.value,
      });
    });

    res.send(`Collections in ArangoDB: ${JSON.stringify(documents)}`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/create", async (req, res) => {
  try {
    const collection = await db.collection("firstCollection");
    const document = {
      // _key: "secondDocument",
      Name: "baz",
      Age: 22
     
    };

    await collection.save(document);
    res.send("Document created successfully!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/update", async (req, res) => {
  try {
    const collection = await db.collection("firstCollection");

    await collection.update("8012470", { a: "zoo" });
    res.send("Document updated successfully!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/delete", async (req, res) => {
  try {
    const collection = await db.collection("firstCollection");

    await collection.remove("firstDocument");
    res.send("Document deleted seccessfully");
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

app.get("/documents", async (req, res) => {
  try {
    // Connect to your ArangoDB collection
    const collection = db.collection("firstCollection");

    const cursor = await collection.all();

    // Extract necessary information from the documents
    const documents = [];
    await cursor.forEach((document) => {
      documents.push({
        document
        // key: document._key,
        // value: document.value,
      });
    });

    res.send(`${JSON.stringify(documents)}`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Routes
// app.use("/home", home);

//  app.use("/home", home(db));

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
