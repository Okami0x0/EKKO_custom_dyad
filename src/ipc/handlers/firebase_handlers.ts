import log from "electron-log";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { apps } from "../../db/schema";
import {
  createLoggedHandler,
  createTestOnlyLoggedHandler,
} from "./safe_handle";

const logger = log.scope("firebase_handlers");
const handle = createLoggedHandler(logger);
const testOnlyHandle = createTestOnlyLoggedHandler(logger);

export function registerFirebaseHandlers() {
  // Set app project - links a Dyad app to a Firebase project
  handle(
    "firebase:set-app-project",
    async (_, { projectId, projectName, app }: { projectId: string; projectName: string; app: number }) => {
      await db
        .update(apps)
        .set({ 
          firebaseProjectId: projectId,
          firebaseProjectName: projectName 
        })
        .where(eq(apps.id, app));

      logger.info(`Associated app ${app} with Firebase project ${projectId} (${projectName})`);
    },
  );

  // Unset app project - removes the link between a Dyad app and a Firebase project
  handle("firebase:unset-app-project", async (_, { app }: { app: number }) => {
    await db
      .update(apps)
      .set({ 
        firebaseProjectId: null,
        firebaseProjectName: null 
      })
      .where(eq(apps.id, app));

    logger.info(`Removed Firebase project association for app ${app}`);
  });

  // Get Firebase project info for an app
  handle("firebase:get-app-project", async (_, { app }: { app: number }) => {
    const appData = await db
      .select({
        firebaseProjectId: apps.firebaseProjectId,
        firebaseProjectName: apps.firebaseProjectName,
      })
      .from(apps)
      .where(eq(apps.id, app))
      .get();

    return appData || null;
  });

  testOnlyHandle(
    "firebase:fake-connect-and-set-project",
    async (
      _,
      { appId, fakeProjectId, fakeProjectName }: { 
        appId: number; 
        fakeProjectId: string;
        fakeProjectName: string;
      },
    ) => {
      // Set the Firebase project for the currently selected app
      await db
        .update(apps)
        .set({
          firebaseProjectId: fakeProjectId,
          firebaseProjectName: fakeProjectName,
        })
        .where(eq(apps.id, appId));
      
      logger.info(
        `Set fake Firebase project ${fakeProjectId} (${fakeProjectName}) for app ${appId} during testing.`,
      );
    },
  );
}
