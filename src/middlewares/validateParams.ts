import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateParams = (schema: ZodSchema)  =>{
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          errors: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }
    }
  };
}
