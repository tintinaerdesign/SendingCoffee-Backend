export interface CoffeeItem {
    id: number;
    name: string;
    price: number;
    category: string;
};

let coffeeDb: CoffeeItem[] = [
    { id: 1, name: 'Iced Americano', price: 75, category: 'iced' },
    { id: 2, name: 'Hot Latte', price: 90, category: 'hot' }
];

export class CoffeeService {
    static async getAll(category?: string): Promise<CoffeeItem[]> {
        if(category) {
            return coffeeDb.filter((item) => item.category === category);
        }
        return coffeeDb;
    }

    static async create(data: Omit<CoffeeItem, 'id'>): Promise<CoffeeItem> {
        const newItem: CoffeeItem = {
            id: coffeeDb.length + 1,
            ...data,
        };
        coffeeDb.push(newItem);
        return newItem;
    }
}
