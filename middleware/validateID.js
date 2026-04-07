import { validate as isUuid } from "uuid";

export function validateId(paramName) {
    return (req, res, next) => {
        const id = req.params[paramName];

        if (!isUuid(id)) {
            return res.status(400).json({ error: 'Ogiltigt ID-format' });
        }

        next();
    };
}

export default validateId;