import { createApplication } from "graphql-modules";

import { userModule } from "./User/user";
import {manifestModule} from "../manifest";

export const application = createApplication({
  modules: [manifestModule, userModule],
});

