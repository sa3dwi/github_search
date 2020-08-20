import opine from "https://deno.land/x/opine@0.21.2/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

//setup port constants
const PORT = config().PORT

const app = opine();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});