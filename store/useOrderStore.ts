'use client';

import { create } from 'zustand';
import { pizzaOrders, PizzaOrder, OrderStatus } from '@/data/pizzaOrders';

type SortField = 'id' | 'customerName' | 'orderDate' | 'status';
type SortDirection = 'asc' | 'desc';

interface OrderState {
  // Data
  orders: PizzaOrder[];
  
  // Filters
  statusFilter: OrderStatus | 'all';
  setStatusFilter: (status: OrderStatus | 'all') => void;
  
  // Sorting
  sortField: SortField;
  sortDirection: SortDirection;
  setSorting: (field: SortField, direction: SortDirection) => void;
  
  // Filtering & Sorting Logic
  filteredOrders: () => PizzaOrder[];
}

export const useOrderStore = create<OrderState>((set, get) => ({
  // Initial data
  orders: pizzaOrders,
  
  // Filter state
  statusFilter: 'all',
  setStatusFilter: (status) => set({ statusFilter: status }),
  
  // Sorting state
  sortField: 'orderDate',
  sortDirection: 'desc',
  setSorting: (field, direction) => set({ sortField: field, sortDirection: direction }),
  

  filteredOrders: () => {
    const { orders, statusFilter, sortField, sortDirection } = get();
    
    // Filter by status
    const filtered = statusFilter === 'all' 
      ? orders 
      : orders.filter(order => order.status === statusFilter);
    
    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let compareA, compareB;
      
      switch(sortField) {
        case 'id':
          compareA = a.id;
          compareB = b.id;
          break;
        case 'customerName':
          compareA = a.customerName;
          compareB = b.customerName;
          break;
        case 'orderDate':
          compareA = new Date(a.orderDate).getTime();
          compareB = new Date(b.orderDate).getTime();
          break;
        case 'status':
          compareA = a.status;
          compareB = b.status;
          break;
        default:
          compareA = a.id;
          compareB = b.id;
      }
      
    
      if (sortDirection === 'asc') {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });
    
    return sorted;
  }
}));