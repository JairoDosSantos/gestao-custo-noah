import nookies from 'nookies'
import type { NextApiRequest, NextApiResponse, NextPageContext } from 'next'

export default async function getUser(req: NextApiRequest, res: NextApiResponse, ctx: NextPageContext) {

    //const user = await supabase.auth.user();

    const user = nookies.get({ req })

    return res.status(200).json({ user: user });

}