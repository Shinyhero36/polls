import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { sessions, users } from "$lib/server/db/schema";
import type { SessionWithUser } from "$lib/types";
import type { Cookies } from "@sveltejs/kit";
import { verify } from "./password";

export const ONE_DAY = 1000 * 60 * 60 * 24;
export const TWO_WEEKS = ONE_DAY * 14;

export const getSession = async (sessionId: string) => {
  return await db.query.sessions.findFirst({
    where: ({ id }, { eq }) => eq(id, sessionId),
    with: {
      user: true,
    },
  });
};

export const createSession = async (userId: string, cookies: Cookies) => {
  const [session] = await db
    .insert(sessions)
    .values({
      userId,
      expiresAt: new Date(Date.now() + TWO_WEEKS),
    })
    .returning();
  cookies.set("sessionId", session.id, {
    path: "/",
    expires: session.expiresAt,
    httpOnly: true,
    priority: "high",
    sameSite: "strict",
    secure: true,
  });
  return session;
};

export const extendSession = async (session: SessionWithUser) => {
  return {
    ...session,
    ...(await db
      .update(sessions)
      .set({
        expiresAt: new Date(Date.now() + TWO_WEEKS),
      })
      .where(eq(sessions.id, session.id))
      .returning()),
  };
};

export const deleteSession = async (sessionId: string, cookies: Cookies) => {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
  cookies.delete("sessionId", {
    path: "/",
    httpOnly: true,
    priority: "high",
    sameSite: "strict",
    secure: true,
  });
};

export const isEmailAlreadyTaken = async (email: string) => {
  const account = await db.query.users.findFirst({
    where: ({ email: dbEmail }, { eq }) => eq(dbEmail, email),
  });
  return !!account;
};

export const createAccount = async ({
  nickname,
  email,
  password,
}: {
  nickname: string;
  email: string;
  password: string;
}) => {
  const [account] = await db
    .insert(users)
    .values({
      nickname,
      email,
      password,
    })
    .returning();
  return account;
};

export const doesCredentialsMatch = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const account = await db.query.users.findFirst({
    where: ({ email: dbEmail }, { eq }) => eq(dbEmail, email),
  });
  if (!account)
    return {
      match: false,
      account: undefined,
    };
  return {
    match: await verify(account.password, password),
    account,
  };
};
