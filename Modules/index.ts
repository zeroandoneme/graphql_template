import { createApplication } from "graphql-modules";

import { userModule } from "./User/user";

export const application = createApplication({
  modules: [userModule],
});
