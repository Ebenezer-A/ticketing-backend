import app from "./config/express.js";
import connectToDb from "./config/mongoose.js";
import * as environments from "./config/environments.js";

const start = async () => {
  await connectToDb();
  app.listen(environments.PORT, () => {
    console.log(`server running on port ${environments.PORT}`);
  });
};

start();
