import { Router } from "express";
import { z } from "zod";
import { db } from "../db";
import { users } from "@shared/schema";
import { hashPassword } from "../lib/auth";
import { eq } from "drizzle-orm";

const auth = Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

auth.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  const { email, password, name } = parsed.data;

  const existing = (await db
    .select()
    .from(users as any)
    .where(eq((users as any).email, email))) as any[];
  if (existing.length > 0) return res.status(409).json({ error: "Email already registered" });

  const passwordHash = await hashPassword(password);
  const inserted = (await db
    .insert(users as any)
    .values({ email, passwordHash, name })
    .returning()) as any[];

  res.status(201).json({ id: inserted[0].id, email: inserted[0].email });
});

export default auth;
