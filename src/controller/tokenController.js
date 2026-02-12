import { supabase } from "../config/supabase.js";

export const saveToken = async (req, res) => {
  try {
    const { user_id, token } = req.body;

    if (!user_id || !token) {
      return res.status(400).json({ error: "Missing user_id or token" });
    }

    const { error } = await supabase
      .from("fcm_tokens")
      .upsert({ user_id, token }, { onConflict: "token" });

    if (error) throw error;

    res.json({ message: "Token saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
