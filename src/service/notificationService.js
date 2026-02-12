import { messaging } from "../config/firebase.js";
import { supabase } from "../config/supabase.js";

export const sendNotificationToUser = async (user_id, title, body) => {
  const { data, error } = await supabase
    .from("fcm_tokens")
    .select("id, token")
    .eq("user_id", user_id);

  if (error) throw error;
  if (!data.length) return { message: "No tokens found" };

  const tokens = data.map(t => t.token);

  const message = {
    notification: { title, body },
    tokens
  };

  const response = await messaging.sendEachForMulticast(message);

  // Clean invalid tokens
  const invalidTokens = [];

  response.responses.forEach((res, index) => {
    if (!res.success) {
      const errorCode = res.error?.code;
      if (errorCode === "messaging/registration-token-not-registered") {
        invalidTokens.push(tokens[index]);
      }
    }
  });

  if (invalidTokens.length) {
    await supabase
      .from("fcm_tokens")
      .delete()
      .in("token", invalidTokens);
  }

  return response;
};
