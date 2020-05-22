import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/all', (req, res) => {
    req.context.models.ProductOffer.find({})
    .populate([
        {path: 'producer', select: 'name'},
        {path: 'product', select: 'name'}
    ])
    .exec((err, productoffer) => {
        if(err) {
            console.log("Error fetching all product offers  " + err);
            return res.status(500).json({error: err});
        }
        console.log("Succesfully returned all product offers");
        res.json(productoffer);
    });
});

router.get('/producer', (req, res) => { // Resgatar oferta de produto pelo produtor
    req.context.models.ProductOffer.find(
        { "producer._id": req.body._id},
        (err, offer) => {
        if(err) {
            console.log("Error when fetching all product offers");
            return res.status(500).json({error: err});
        }
        console.log("Succesfully fetched matching product offer");
        return res.json(offer);
    });
});
router.post('/', (req, res) => {    // Criar nova oferta de produto
    var offer = new req.context.models.ProductOffer(req.body);

    offer.save((err) => {
        if (err) {
            console.log("Error creating new product offer  " + err);
            res.status(422).json({erro: err});
        } else {
            console.log("Succesfully created new product offer");
            res.json(offer._id);
        }
    })
});

router.patch('/', (req, res) => {   // Modificar oferta pelo _id
    req.context.models.ProductOffer.update(
        { _id: req.body.id },
        req.body,
        (err) => {
            if(err) {
                console.log("Error modifying order  " + err);
                return res.status(422).json({error: err});
            }
            console.log("Succesfully modified order");
            return res.send();
        })
})

router.delete('/delete', (req, res) => {    // Excluir oferta pelo _id
    req.context.models.Order.deleteMany({
        "products.productOffer": mongoose.Schema.Types.ObjectId(req.body._id)
    }, (err) => {
        if(err) {
            console.log("Error removing orders associated with offer");
             res.status(422).json({error: err});
        }
    });
    req.context.models.ProductOffer.deleteOne({
        _id: req.body._id
    }, (err) => {
        if(err) {
            console.log("Error removing offer");
            res.status(422).json({error: err});
        }
    });
})

router.get('/', (req, res) => {
    req.context.models.ProductOffer.find({ _id: req.body.id }, (err, offer) => {
        if(err) {
            console.log("Error fetching product offer");
            return res.status(500).json({error: err});
        }
        console.log("Succesfully fetched matching product offer");
        return res.json(offer);
    });
});

export default router;