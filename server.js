import express from "express";
const router = express.Router();
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import Questions from "./models/questionSchema.js";
import Results from "./models/resultSchema.js";
import questions, { answers } from "./database/data.js";
// import router from "./router/questions.js";

/** import connection file */
import connect from "./database/conn.js";

const app = express();

/** app middlewares */
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
config();

/** appliation port */
const port = process.env.PORT || 8080;

/** routes */

// app.use("/api", router); /** apis */

app.get("/", (req, res) => {
  try {
    res.json("Get Request");
  } catch (error) {
    res.json(error);
  }
});

app.listen(port, console.log(`Listening on port ${port}...`));
/** start server only when we have valid connection */
// connect()
//   .then(() => {
//     try {
//       app.listen(port, () => {
//         console.log(`Server connected to http://localhost:${port}`);
//       });
//     } catch (error) {
//       console.log("Cannot connect to the server");
//     }
//   })
//   .catch((error) => {
//     console.log("Invalid Database Connection");
//   });
connect();
app.use(
  "/api",
  router.get("/getQuestions", async (req, res) => {
    try {
      const q = await Questions.find();
      res.json(q);
    } catch (error) {
      res.json({ error });
    }
  })
);
app.use(
  "/api",
  router.get("/insertQuestions", async (req, res) => {
    try {
      Questions.insertMany({ questions, answers }, function (err, data) {
        res.json({ msg: "Data Saved Successfully...!" });
      });
    } catch (error) {
      res.json({ error });
    }
  })
); /** apis */

app.use(
  "/api",
  router.get("/getResult", async (req, res) => {
    try {
      const r = await Results.find();
      res.json(r);
    } catch (error) {
      res.json({ error });
    }
  })
);

app.use(
  "/api",
  router.get("/storeResult", async (req, res) => {
    try {
      const { username, result, attempts, points, achived } = req.body;
      if (!username && !result) throw new Error("Data Not Provided...!");

      Results.create(
        { username, result, attempts, points, achived },
        function (err, data) {
          res.json({ msg: "Result Saved Successfully...!" });
        }
      );
    } catch (error) {
      res.json({ error });
    }
  })
);

app.use(
  "/api",
  router.get("/dropResult", async (req, res) => {
    try {
      await Results.deleteMany();
      res.json({ msg: "Result Deleted Successfully...!" });
    } catch (error) {
      res.json({ error });
    }
  })
);
