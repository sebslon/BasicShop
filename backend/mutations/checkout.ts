import { KeystoneContext } from "@keystone-next/types";
import {
  CartItemCreateInput,
  OrderCreateInput,
} from "../.keystone/schema-types";

import stripeConfig from "../lib/stripe";

interface Arguments {
  token: string;
}

export default async function checkout(
  root: any,
  { token }: Arguments, //args
  context: KeystoneContext
): Promise<OrderCreateInput> {
  const userId = context.session.itemId;

  if (!userId) {
    throw new Error("You must be signed in to create an order!");
  }

  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: `
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `,
  });

  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  const amount = cartItems.reduce(
    (acc: number, cartItem: CartItemCreateInput) => {
      return acc + cartItem.quantity * cartItem.product.price;
    },
    0
  );

  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: "USD",
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });

  const orderItems = cartItems.map((item) => {
    const orderItem = {
      name: item.product.name,
      description: item.product.description,
      price: item.product.price,
      quantity: item.quantity,
      photo: { connect: { id: item.product.photo.id } },
    };

    return orderItem;
  });

  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId }}
    }
  });

  const cartItemIds = user.cart.map(cartItem => cartItem.id);
  await context.lists.CartItem.deleteMany({ ids: cartItemIds });

  return order;
}
