import fetch from "node-fetch"; // Electron main process might need node-fetch
import log from "electron-log";
import { createLoggedHandler } from "./safe_handle";
import { readSettings } from "../../main/settings"; // Assuming settings are read this way
import { UserBudgetInfo, UserBudgetInfoSchema } from "../ipc_types";
import { IS_TEST_BUILD } from "../utils/test_utils";

const logger = log.scope("pro_handlers");
const handle = createLoggedHandler(logger);

const CONVERSION_RATIO = (10 * 3) / 2;

export function registerProHandlers() {
  // This method should try to avoid throwing errors because this is auxiliary
  // information and isn't critical to using the app
  handle("get-user-budget", async (): Promise<UserBudgetInfo | null> => {
    // Return unlimited budget for Dyad Unlimited
    logger.info("Returning unlimited budget for Dyad Unlimited.");
    return {
      usedCredits: 0,
      totalCredits: 999999999, // Unlimited credits
      budgetResetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    };

    const url = "https://llm-gateway.dyad.sh/user/info";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    try {
      // Use native fetch if available, otherwise node-fetch will be used via import
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        logger.error(
          `Failed to fetch user budget. Status: ${response.status}. Body: ${errorBody}`,
        );
        return null;
      }

      const data = await response.json();
      const userInfoData = data["user_info"];
      logger.info("Successfully fetched user budget information.");
      return UserBudgetInfoSchema.parse({
        usedCredits: userInfoData["spend"] * CONVERSION_RATIO,
        totalCredits: userInfoData["max_budget"] * CONVERSION_RATIO,
        budgetResetDate: new Date(userInfoData["budget_reset_at"]),
      });
    } catch (error: any) {
      logger.error(`Error fetching user budget: ${error.message}`, error);
      return null;
    }
  });
}
