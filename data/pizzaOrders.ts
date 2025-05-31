export type OrderStatus = 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface PizzaOrder {
    id: string;
    customerName: string;
    pizzaType: string;
    quantity: number;
    orderDate: string;
    status: OrderStatus;
}

export const pizzaOrders: PizzaOrder[] = [
    {
        id: 'PZA001',
        customerName: 'John Doe',
        pizzaType: 'Margherita',
        quantity: 2,
        orderDate: '2025-03-01 14:30',
        status: 'delivered',
    },
    {
        id: 'PZA002',
        customerName: 'Jane Smith',
        pizzaType: 'Pepperoni',
        quantity: 1,
        orderDate: '2025-03-01 15:45',
        status: 'preparing',
    },
    {
        id: 'PZA003',
        customerName: 'Bob Johnson',
        pizzaType: 'Hawaiian',
        quantity: 3,
        orderDate: '2025-03-02 12:15',
        status: 'pending',
    },
    {
        id: 'PZA004',
        customerName: 'Alice Brown',
        pizzaType: 'Vegetarian',
        quantity: 1,
        orderDate: '2025-03-02 13:20',
        status: 'out_for_delivery',
    },
    {
        id: 'PZA005',
        customerName: 'Charlie Wilson',
        pizzaType: 'Supreme',
        quantity: 2,
        orderDate: '2025-03-02 16:30',
        status: 'delivered',
    },
    {
        id: 'PZA006',
        customerName: 'Diana Miller',
        pizzaType: 'BBQ Chicken',
        quantity: 1,
        orderDate: '2025-03-03 11:45',
        status: 'cancelled',
    },
    {
        id: 'PZA007',
        customerName: 'Ethan Davis',
        pizzaType: 'Meat Lovers',
        quantity: 4,
        orderDate: '2025-03-03 18:10',
        status: 'pending',
    },
    {
        id: 'PZA008',
        customerName: 'Fiona Garcia',
        pizzaType: 'Mushroom & Olive',
        quantity: 2,
        orderDate: '2025-03-04 19:30',
        status: 'preparing',
    },
    {
        id: 'PZA009',
        customerName: 'George Lee',
        pizzaType: 'Buffalo Chicken',
        quantity: 1,
        orderDate: '2025-03-04 20:15',
        status: 'delivered',
    },
    {
        id: 'PZA010',
        customerName: 'Hannah Kim',
        pizzaType: 'Veggie Supreme',
        quantity: 2,
        orderDate: '2025-03-05 12:45',
        status: 'out_for_delivery',
    },
    {
        id: 'PZA011',
        customerName: 'Ian Thompson',
        pizzaType: 'Four Cheese',
        quantity: 1,
        orderDate: '2025-03-05 14:30',
        status: 'pending',
    },
    {
        id: 'PZA012',
        customerName: 'Julia Roberts',
        pizzaType: 'Spinach & Feta',
        quantity: 3,
        orderDate: '2025-03-06 17:20',
        status: 'preparing',
    },
];