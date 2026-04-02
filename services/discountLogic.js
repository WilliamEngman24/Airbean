export function calculateDiscount(cart) {

    if (!Array.isArray(cart) || cart.length === 0) {

        return { totalPreDiscount: 0, totalPostDiscount: 0, discountAmount: 0, discountTypes: [] };
    }

    //calculate total price before discount
    let totalPreDiscount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    //have post discount start as pre discount and then apply discounts to it
    let totalPostDiscount = totalPreDiscount;
    const discountTypes = [];

    const latte = cart.find(item => item.name === 'Kaffe Latte');

    //discount for 2 or more latte, 20kr off total price
    if (latte && latte.quantity >= 2) {
        totalPostDiscount -= 20;
        discountTypes.push({ name: 'Two Latte Discount', amount: 20 });
    }

    //discount for buying the different latte types together
    const latteCombo = new Set(cart.map(item => item.name));
    if (latteCombo.has('Kaffe Latte') && latteCombo.has('Latte Macchiato')){
        totalPostDiscount -= 15;
        discountTypes.push({ name: 'Latte Combo Discount', amount: 15 });
    }

    //if somhow total becomes minus then set to 0
    if(totalPostDiscount < 0) totalPostDiscount = 0;

    return{
        totalPreDiscount,
        totalPostDiscount,
        discountAmount: totalPreDiscount - totalPostDiscount,
        discountTypes
    };
}

export default calculateDiscount;