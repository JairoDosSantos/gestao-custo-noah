import { supabase } from "../../utils/supabaseClient";
import nookies from 'nookies'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function registerUser(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;


    const { user, error } = await supabase.auth.signIn({
        email,
        password
    });
    if (error) return res.status(401).json({ error: error.message });

    if (!error) nookies.set({ res }, 'USER_LOGGED', JSON.stringify(user), {
        maxAge: 86400,
        path: '/',
    })

    return res.status(200).json({ user: user });

}