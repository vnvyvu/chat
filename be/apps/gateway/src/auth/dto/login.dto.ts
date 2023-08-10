import { Output, email, object, regex, string } from 'valibot';

export const LoginReqSchema = object({
  email: string([email()]),
  password: string([
    regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]),
});

export type LoginReq = Output<typeof LoginReqSchema>;
