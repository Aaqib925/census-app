import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

addRxPlugin(RxDBDevModePlugin);

export const mydatabase = await createRxDatabase({
  name: "mydatabase",
  storage: getRxStorageDexie(),
});

const userSchema = {
  title: "user schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 255,
    },
    email: {
      type: "string",
    },
  },
};

await mydatabase.addCollections({
  user: {
    schema: userSchema,
  },
});
