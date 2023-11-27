export type Price = {
    old_price: number;
    current_price: number;
};

export type Image = {
    url: string;
};

export type Product = {
    id: string;
    name: string;
    code: string;
    price: Price;
    image: Image;
    material: number;
};

export type HeartsData = {
    id: string;
    status:boolean;
};
export type WayData = {
    way: string;
};

