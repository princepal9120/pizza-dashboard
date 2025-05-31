'use client';

import { useState } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { OrderStatus } from '@/data/pizzaOrders';
import { StatusBadge } from './status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

export function OrdersTable() {
  const { filteredOrders, setStatusFilter, statusFilter, sortField, sortDirection, setSorting } = useOrderStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setStatusFilter(value as OrderStatus | 'all');
  };

  // Handle sort change
  const handleSort = (field: 'id' | 'customerName' | 'orderDate' | 'status') => {
    if (sortField === field) {
      // Toggle direction if already sorting by this field
      setSorting(field, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to ascending for new sort field
      setSorting(field, 'asc');
    }
  };

  // Get sort icon for column
  const getSortIcon = (field: 'id' | 'customerName' | 'orderDate' | 'status') => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  // Filter orders based on search query
  const displayedOrders = filteredOrders().filter((order) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.pizzaType.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <Button 
                    variant="ghost" 
                    className="flex items-center px-0 font-medium"
                    onClick={() => handleSort('id')}
                  >
                    Order ID
                    {getSortIcon('id')}
                  </Button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <Button 
                    variant="ghost" 
                    className="flex items-center px-0 font-medium"
                    onClick={() => handleSort('customerName')}
                  >
                    Customer
                    {getSortIcon('customerName')}
                  </Button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Pizza Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <Button 
                    variant="ghost" 
                    className="flex items-center px-0 font-medium"
                    onClick={() => handleSort('orderDate')}
                  >
                    Order Date
                    {getSortIcon('orderDate')}
                  </Button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <Button 
                    variant="ghost" 
                    className="flex items-center px-0 font-medium"
                    onClick={() => handleSort('status')}
                  >
                    Status
                    {getSortIcon('status')}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((order) => (
                <tr key={order.id} className="border-t transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-sm">{order.customerName}</td>
                  <td className="px-4 py-3 text-sm">{order.pizzaType}</td>
                  <td className="px-4 py-3 text-sm">{order.quantity}</td>
                  <td className="px-4 py-3 text-sm">
                    {format(new Date(order.orderDate), 'PPp')}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
              {displayedOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="h-24 text-center text-muted-foreground">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{displayedOrders.length}</span> of{' '}
          <span className="font-medium">{filteredOrders().length}</span> orders
        </p>
      </div>
    </div>
  );
}