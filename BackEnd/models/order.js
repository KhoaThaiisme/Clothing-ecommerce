import mongoose from 'mongoose'

export const Schema = mongoose.Schema

export const OrderSchema = new Schema ({
    orderItems: [{
        name: String,
        quantity: Number,
        image: String,
        price: Number,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    }],
    shippingAddress: {
        fullName: String,
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    imtesPrice: Number,
    totalPrice: Number, 
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}, 
    isPaid: { type: Boolean, default: false},
    },
    { 
        timestamps: true,
    }
)

export const Order = mongoose.model('Order', OrderSchema)
