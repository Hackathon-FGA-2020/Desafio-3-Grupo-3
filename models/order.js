import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var OrderSchema = new Schema ({
    products: [{
        productOffer: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'ProductOffer'
        },
        qty: Number
    }],
    buyer: {
        type: Schema.Types.ObjectId,
        unique: false,
        required: true,
        ref: 'User'
    },
    order_location: {
        type: String,
        unique: false,
        required: true,
    },
    order_status: {
        type: String,
        unique: false,
        required: true
    },
    comments: {
        type: String,
        unique: false,
        required: false
    }
    },
    { timestamps: true }    // data e horario
);

export default mongoose.model('Order', OrderSchema);