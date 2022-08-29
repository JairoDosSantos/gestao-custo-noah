import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

import nookies from 'nookies'

export default async function logoutUser(req: NextApiRequest, res: NextApiResponse) {
    let { error } = await supabase.auth.signOut();
    const cookieDestroyed = nookies.destroy(null, 'USER_LOGGED')
    console.log(cookieDestroyed)
    if (error) return res.status(401).json({ error: error.message });
    return res.status(200).json({ body: "Sessão terminada com sucesso" });
}