import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function registerUser(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    let { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) return res.status(401).json({ error: error.message });
    return res.status(200).json({ user: user });
}