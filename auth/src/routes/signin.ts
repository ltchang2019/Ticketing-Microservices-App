import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user'; 
import { Password } from '../utils/password';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/sign-in', 
    [
        body('email')
            .isEmail()
            .withMessage('Please enter valid email.'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Must supply a password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if(!existingUser) {
            throw new BadRequestError('Invalid email.');
        }

        const passwordsMatch = await Password.comparePasswords(existingUser.password, password);
        if(!passwordsMatch) {
            throw new BadRequestError('Invalid password.')
        }

        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email
            }, 
            process.env.JWT_KEY!
        );

        req.session = {
            jwt: userJwt
        }

        res.status(200).send(existingUser);
    }
);

export { router as signinRouter };