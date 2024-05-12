const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
// app.use(
//   cors({
//     // origin: "https://food-distribution2.netlify.app",
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4njvdfp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("my-profile");
    const servicesCollection = db.collection("services");
    const skillsCollection = db.collection("skills");
    const backendSkillsCollection = db.collection("backend_skills");
    const projectsCollection = db.collection("projects");
    const educationsCollection = db.collection("educations");
    const blogsCollection = db.collection("blogs");

    app.get("/services", async (req, res) => {
      const result = await servicesCollection.find().toArray();
      res.send(result);
    });

    // project related API
    app.post("/projects", async (req, res) => {
      const project = req.body;
      console.log(project);
      const result = await projectsCollection.insertOne(project);
      res.send(result);
    });
    app.get("/projects", async (req, res) => {
      const result = await projectsCollection.find().toArray();
      res.send(result);
    });
    app.get("/projects/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await projectsCollection.findOne(query);
      res.send(result);
    });
    app.put("/projects/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatingProject = req.body;
      const updateDoc = {
        $set: {
          status: updatingProject.status,
        },
      };
      const result = await projectsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    app.delete("/project/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await projectsCollection.deleteOne(query);
      res.send(result);
    });

    // skill related API
    app.post("/skills", async (req, res) => {
      const skill = req.body;
      console.log(skill);
      const result = await skillsCollection.insertOne(skill);
      res.send(result);
    });
    app.get("/skills", async (req, res) => {
      const result = await skillsCollection.find().toArray();
      res.send(result);
    });
    app.get("/skills/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await skillsCollection.findOne(query);
      res.send(result);
    });
    app.put("/skills/:id", async (req, res) => {
    const id = req.params.id;
    const updatedSkill = req.body;

    // Validate input to ensure updatedSkill contains only allowed fields

    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const skillUpdate = {
        $set: {
            name: updatedSkill.name,
            image: updatedSkill.image
        }
    };

    try {
        const result = await skillsCollection.updateOne(
            filter,
            skillUpdate,
            options
        );

        // Check if the update was successful and respond accordingly
        if (result.modifiedCount === 1 || result.upsertedCount === 1) {
            res.status(200).json({ message: "Skill updated successfully" });
        } else {
            res.status(404).json({ error: "Skill not found" });
        }
    } catch (err) {
        console.error("Error updating skill:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
    app.delete("/skills/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await skillsCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/backend_skills", async (req, res) => {
      const result = await backendSkillsCollection.find().toArray();
      res.send(result);
    });

    // education related API
    app.post("/educations", async (req, res) => {
      const education = req.body;
      console.log(education);
      const result = await educationsCollection.insertOne(education);
      res.send(result);
    });
    app.get("/educations", async (req, res) => {
      const result = await educationsCollection.find().toArray();
      res.send(result);
    });
    app.get("/educations/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await educationsCollection.findOne(query);
      res.send(result);
    });
    app.put("/educations/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatingEducation = req.body;
      const updateDoc = {
        $set: {
          status: updatingEducation.status,
        },
      };
      const result = await educationsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    app.delete("/educations/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await educationsCollection.deleteOne(query);
      res.send(result);
    });

    // blog related API
    app.post("/blogs", async (req, res) => {
      const blog = req.body;
      console.log(blog);
      const result = await blogsCollection.insertOne(blog);
      res.send(result);
    });
    app.get("/blogs", async (req, res) => {
      const result = await blogsCollection.find().toArray();
      res.send(result);
    });
    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogsCollection.findOne(query);
      res.send(result);
    });
    app.put("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatingBlog = req.body;
      const updateDoc = {
        $set: {
          status: updatingBlog.status,
        },
      };
      const result = await blogsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    app.delete("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogsCollection.deleteOne(query);
      res.send(result);
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});

// update projects
// app.put("/api/v1/projects/:id", async (req, res) => {
//   const id = req.params.id;
//   const updatedProject = req.body;

//   const filter = { _id: new ObjectId(id) };
//   const options = { upsert: true };
//   const project = {
//     $set: {
//       title: updatedProject.title,
//       quantity: updatedProject.quantity,
//       category: updatedProject.category,
//     },
//   };
//   const result = await projectCollection.updateOne(
//     filter,
//     project,
//     options
//   );

//   res.send(result);
// });
