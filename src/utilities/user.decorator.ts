import { createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((data, req) => {console.log(req,"here is data in param"); return req.user}); 