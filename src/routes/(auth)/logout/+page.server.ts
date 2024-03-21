import { deleteSession } from "$lib/helpers/account";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals, cookies }) => {
  const session = await locals.getSession();
  if (session) await deleteSession(session.id, cookies);

  throw redirect(302, "/");
};
