import { z } from "zod";

export const GoogleLoginSchema = z.object({
  credential: z.string().min(10).optional(),
  token: z.string().min(10).optional(),
  type:z.enum(['credential','token'])

}).superRefine((arg,ctx)=>{
  if(arg.type==='credential' && !arg.credential){
    ctx.addIssue({
      code:'custom',
      message:'Crendential field must be specified if type is set as credential',
      path:['credential']
    })
  }

  if(arg.type==='token' && !arg.token){
    ctx.addIssue({
      code:'custom',
      message:'Token field must be specified if type is set as token',
      path:['token']
    })
  }
});

export type GoogleLoginDto = z.infer<typeof GoogleLoginSchema>;
