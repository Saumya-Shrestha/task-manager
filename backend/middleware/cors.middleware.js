import cors from "cors";

const corsOptions = {
  origin: "*",
};

const initializeCors = () => cors(corsOptions);

export default initializeCors;
