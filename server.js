import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Client, TopicMessageSubmitTransaction, PrivateKey, AccountId } from "@hashgraph/sdk";
import { askAI } from "./ai-agent.js";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static("."));

const client = Client.forTestnet().setOperator(
  AccountId.fromString(process.env.HEDERA_OPERATOR_ID),
  PrivateKey.fromString(process.env.HEDERA_OPERATOR_KEY)
);
const TOPIC_ID = process.env.SOLIDAI_TOPIC_ID;

app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;
    const answer = await askAI(question);

    const msgTx = new TopicMessageSubmitTransaction()
      .setTopicId(TOPIC_ID)
      .setMessage(JSON.stringify({ question, answer }));
    await msgTx.execute(client);

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing request");
  }
});

app.get("/feed", async (req, res) => {
  res.sendFile(`${__dirname}/verify.html`);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 SolidAI running at http://localhost:${PORT}`));
