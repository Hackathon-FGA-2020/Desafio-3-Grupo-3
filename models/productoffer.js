import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var ProductOfferSchema = new Schema ({
    producer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: false 
    },
    available: {
        type: Boolean,
        required: true,
        unique: false
    },
    qty: {
        type: Number,
        required: false,
        unique: false
    }
    },
    { timestamps: true }    // data e horario
);

export default mongoose.model('ProductOffer', ProductOfferSchema); // Aqui vai o foregin key