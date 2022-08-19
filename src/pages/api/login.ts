import { supabase } from "../../utils/supabaseClient";


import type { NextApiRequest, NextApiResponse } from 'next'

export default async function registerUser(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;


    const { user, session, error } = await supabase.auth.signIn({
        email,
        password
    });

    //window.localStorage.setItem(email, JSON.stringify(session));


    /**
     * supabase.auth.api.setAuthCookie(req, res)
         *  const getCookie = supabase.auth.api.getUserByCookie(req)
          * console.log(getCookie)
     */

    if (error) {
        return res.status(401).json({ error: error.message });

    } else {
        return res.status(200).json({ user: user });
    }

}