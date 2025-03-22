const rand = () => {
    return Math.random().toString(36).substr(2);
};

export const token = () => {
    return rand() + rand();
};

export const formatCurrency = (price) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        trailingZeroDisplay: 'stripIfInteger'
      });

    return formatter.format(price);
}