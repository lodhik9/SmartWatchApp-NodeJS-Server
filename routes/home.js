const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});


router.get("/get", async (req, res) => {
  try {
    // Perform ArangoDB operations using the db object
    const collection = await res.db.collection("firstCollection");
    const cursor = await collection.all();

    // Extract necessary information from the documents
    const documents = [];
    await cursor.forEach((document) => {
      documents.push({
        // document
        key: document.a,
        value: document.value,
      });
    });

    res.send(`Collections in ArangoDB: ${JSON.stringify(documents)}`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/create", async (req, res) => {
  try {
    const collection = await res.db.collection("firstCollection");
    const document = {
      // _key: "secondDocument",
      a: "baz",
      b: "qux",
      c: Date(),
    };

    await collection.save(document);
    res.send("Document created successfully!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/update", async (req, res) => {
  try {
    const collection = await res.db.collection("firstCollection");

    await collection.update("8012470", { a: "zoo" });
    res.send("Document updated successfully!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/delete", async (req, res) => {
  try {
    const collection = await res.db.collection("firstCollection");

    await collection.remove("firstDocument");
    res.send("Document deleted seccessfully");
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

router.get("/documents", async (req, res) => {
  try {
    // Connect to your ArangoDB collection
    const collection = res.db.collection("firstCollection");

    const cursor = await collection.all();

    // Extract necessary information from the documents
    const documents = [];
    await cursor.forEach((document) => {
      documents.push({
        // document
        key: document.a,
        value: document.value,
      });
    });

    res.send(`Collections in ArangoDB: ${JSON.stringify(documents)}`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;


