import { supabase } from "../../utils/supabaseClient";
import nookies from 'nookies'
import type { NextApiRequest, NextApiResponse, NextPageContext } from 'next'

export default async function getUser(req: NextApiRequest, res: NextApiResponse, ctx: NextPageContext) {

    //const user = await supabase.auth.user();
    // const user = window.localStorage.getItem('jairocrissantos@gmail.com')
    const user = nookies.get(ctx)

    return res.status(200).json({ user: user });

}