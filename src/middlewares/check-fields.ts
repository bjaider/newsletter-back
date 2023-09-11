import { Request, Response, NextFunction } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';

type ValidationErrors = Result<ValidationError>;

const checkFields = (req: Request, res: Response, next: NextFunction) => {
  const errors: ValidationErrors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export { checkFields };
