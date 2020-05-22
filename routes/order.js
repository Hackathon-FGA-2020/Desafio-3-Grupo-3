import express from 'express';

const router = new express.Router();

router.get('/all', (req, res) => {
    req.context.models.Order.find({})
    .populate([
        {path: 'products', select: 'productOffer'},
        {path: 'buyer', select: 'name'},
        {path: 'order_location', select: 'name'}
    ])
    .exec((err, orders) => {
        if(err) {
            console.log("error displaying all orders");
            return res.status(500).json({error: err});
        } 
        console.log("displaying all orders");
        res.json(orders);
    });
});

router.post('/', (req, res) => {
    var order = new req.context.models.Order(req.body);

    order.save((err) => {
        if(err) {
            console.log("error creating order" + err);
            return res.status(422).json({error: err});
        }
        console.log("Succesfully created new order");
        return res.json(order);
    })
})

router.patch('/', (req, res) => { // Modificar dados do pedido, a partir do _id
    req.context.models.Order.update({ _id: req.body._id}, req.body, (err, matched) => {
        if(err) {
            console.log("Error when updating order" + err);
            res.status(422).json({error: err});
        } else {
            console.log(matched.n + " order(s) updated succesfully");
            res.send();
        }
    });
});

router.delete('/', (req, res) => {
    req.context.models.Order.deleteOne(
        { _id: req.body._id},
        (err) => {
            if(err) {
                console.log("Error when deleting order  " + err);
                return res.status(422).json({error: err});
            }
            return res.status();
    });
})

router.get('/', (req, res) => {
    req.context.models.Order.find(
        { _id: req.body._id},
        (err, ord) => {
            if(err) {
                console.log("Error when fetching order  " + err);
                return res.status(422).json({error: err});
            }
            return res.json(ord);
        });
});

router.get('/producer', (req, res) => {
    req.context.models.Order.find(
        { buyer: req.body._id},
        (err, ord) => {
            if(err) {
                console.log("Error fetching products for producer  " + err);
                return res.status(422).json({error: err});
            }
            return res.json(ord);
        }
    );
});

router.get('/user', (req, res) => {
    req.context.models.Order.find(
        { buyer: req.body._id},
        (err, ord) => {
            if(err) {
                console.log("Error fetching products for user  " + err);
                return res.status(422).json({error: err});
            }
            return res.json(ord);
        }
    );
});
export default router;