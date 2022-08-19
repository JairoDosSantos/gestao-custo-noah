import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function logoutUser(req: NextApiRequest, res: NextApiResponse) {
    let { error } = await supabase.auth.signOut();


    if (error) return res.status(401).json({ error: error.message });
    return res.status(200).json({ body: "Sessão terminada com sucesso" });
}