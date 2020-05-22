import express from 'express';

const router = express.Router();

router.get('/all', (req, res) => { 
    req.context.models.Product.find({})
    .exec((err, _products) => {
        if(err) {
            console.log("Error displaying all products  " + err);
            res.status(500).json(err);
        } else {
            console.log("Displaying all products");
            res.json(_products);
        }
    })
})

router.get('/', async function (req, res) {  // Encontrar o produto pelo nome ou sinonimos registrados
    const nameQuery = await req.context.models.Product.find({ name: req.body.name});
    if(nameQuery.length == 0) {
        const synonymsQuery = await req.context.models.Product.find({ synonyms: req.body.name});
        if(synonymsQuery.length == 0) {
            console.log("Product not found");
            res.status(404).json("Product not found");
        } else {
            console.log("Found product");
            res.json(synonymsQuery);
        }
    } else {
        console.log("Found product");
        res.json(nameQuery);
    }

});

router.patch('/', (req, res) => { // Modificar dados de produto, a partir do nome ou do _id
    if(req.body.hasOwnProperty('_id')) {
        req.context.models.Product.update({ _id: req.body._id}, req.body, (err, matched) => {
            if(err) {
                console.log("Error when updating product  " + err);
                res.status(422).json(err);
            } else {
                console.log(matched.n + " product(s) updated succesfully");
                res.json(matched.n + " product(s) updated succesfully");
            }
        });
    } else if(req.body.hasOwnProperty('name')) {
        req.context.models.Product.update({ name: req.body.name }, req.body, (err, matched) => {
            if(err) {
                console.log("Error when updating product  " + err);
                res.status(422).json(err);
            } else {
                console.log(matched.n + " product(s) updated succesfully");
                res.json(matched.n + " product(s) updated succesfully");
            }
        });
    } else {
        console.log("No name or _id supplied");
        res.status(422).json("No name or _id supplied.");
    }
});

router.delete('/', (req, res) => {
    req.context.models.Product.deleteOne(
        { _id: req.body._id },
        (err) => {
            if(err) {
                console.log("error deleting product  " + err);
                return res.status(500).json(err);
            }
            return res.send();
        }
    );
})

router.post('/', (req, res) => { // Criar novo produto a partir do corpo do JSON recebido
    var prod = new req.context.models.Product(req.body);

    prod.save((err) => {
        if (err) {
            console.log("error creating product");
            console.log(err);
            res.status(422).json('Error creating product in database  ' + err);
        } else {
            console.log("Succesfully created new product");
            res.json(prod);
        }
    })
});

export default router;