import { z } from "zod";
import { isTenDigitPhone } from "./format";

const emailSchema = z.email();

export function isEmail(value: string) {
  return emailSchema.safeParse(value.trim()).success;
}

/** The Porch Report accepts an email address or a 10-digit mobile number. */
export function isEmailOrPhone(value: string) {
  return isEmail(value) || isTenDigitPhone(value);
}
