import express from 'express';

var router = express.Router();

router.get('/', (req, res) => {
    req.context.models.Producer.find({})
    .exec((err, _producer) => {
        if(err) {
            console.log('Error fetching producer  ' + err);
            res.status(422).json({error: err});
        } else {
            console.log('Succesfully fetched all producers');
            res.json(_producer);
        }
    })
});


router.post('/', (req, res) => {    // Resgatar produtor pelo _id
    req.context.models.Producer.findOne({
        _id: req.params.producerId
    })
    .exec((err, _producer) => {
        if(err) {
            console.log('Error fetching producer  ' + err);
            res.status(422).json(err);
        } else {
            console.log("Succesfully fetched producer");
            res.json(_producer);
        }
    })
});

export default router;