import express from 'express';

var router = express.Router();

router.get('/', (req, res) => {
    return req.context.models.users[req.context.me];
});

export default router;