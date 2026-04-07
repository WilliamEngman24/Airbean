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
        discountTypes.push({ id: "1b7d3e9a-2c4f-4e33-9c8a-7f2b1d6e4a11", title: 'Two Latte Discount', amount: 20 });
    }

    //discount for buying the different latte types together
    const latteCombo = new Set(cart.map(item => item.name));
    if (latteCombo.has('Kaffe Latte') && latteCombo.has('Latte Macchiato')){
        totalPostDiscount -= 15;
        discountTypes.push({ id: "6f2a9c1d-3b7e-4f22-a5d9-8c1e3b7a2d22",title: 'Latte Combo Discount', amount: 15 });
    }

    //bun and coffee combo discount. can make more efficient if adding field to all menu items to have 'category'
    const coffeeItems = new Set(['Bryggkaffe','Caffè Doppio','Cappuccino','Latte Macchiato','Kaffe Latte','Cortado']);
    const hasBun = cart.some(item => item.name === 'Kanelbulle');
    const hasCoffee = cart.some(item => coffeeItems.has(item.name));

    if (hasBun && hasCoffee){
        totalPostDiscount -= 20;
        discountTypes.push({ id: "e3b1a7d9-5c2f-4a11-b9e3-6d7c2f1a8b33", title: 'Bun and Coffee Combo Discount', amount: 20 });
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
