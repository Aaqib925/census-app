import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";

addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBUpdatePlugin);

export const mydatabase = await createRxDatabase({
  name: "mydatabase",
  storage: getRxStorageDexie(),
});

// user schema
const userSchema = {
  title: "user schema",
  version: 0,
  primaryKey: "userId",
  type: "object",
  properties: {
    userId: {
      type: "string",
      maxLength: 255,
    },
    email: {
      type: "string",
    },
  },
  required: ["userId", "email"],
};

// task schema
const taskSchema = {
  title: "task schema",
  version: 0,
  type: "object",
  primaryKey: "id",
  properties: {
    id: {
      type: "string",
      maxLength: 255,
    },
    text: {
      type: "string",
    },
    indicatorColor: {
      type: "string",
    },
    inputType: {
      type: "string",
    },
  },
  required: ["id", "text", "indicatorColor", "inputType"],
};

// checklist item schema
const checklistItemSchema = {
  title: "checklist item schema",
  version: 0,
  type: "object",
  primaryKey: "checklistId",
  properties: {
    checklistId: {
      type: "string",
      maxLength: 255,
    },
    userId: {
      type: "string",
    },
    title: {
      type: "string",
    },
    tasks: {
      type: "array",
      items: taskSchema,
    },
  },
  required: ["checklistId", "userId", "title", "tasks"],
};

await mydatabase.addCollections({
  user: {
    schema: userSchema,
  },
  checklists: {
    schema: checklistItemSchema,
  },
  tasks: {
    schema: taskSchema,
  },
});
