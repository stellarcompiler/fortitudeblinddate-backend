import { sendNotificationToUser } from "../service/notificationService.js";

export const notifyUser = async (req, res) => {
  try {
    const { user_id, title, body } = req.body;

    if (!user_id || !title || !body) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await sendNotificationToUser(user_id, title, body);

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
