import { cn } from '@/lib/utils';
import { OrderStatus } from '@/data/pizzaOrders';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig: Record<OrderStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    pending: {
      label: 'Pending',
      variant: 'outline',
    },
    preparing: {
      label: 'Preparing',
      variant: 'secondary',
    },
    out_for_delivery: {
      label: 'Out for Delivery',
      variant: 'default',
    },
    delivered: {
      label: 'Delivered',
      variant: 'default',
    },
    cancelled: {
      label: 'Cancelled',
      variant: 'destructive',
    },
  };

  const config = statusConfig[status];

  return (
    <Badge 
      variant={config.variant} 
      className={cn(
        status === 'delivered' && 'bg-green-500 hover:bg-green-500/80',
        status === 'out_for_delivery' && 'bg-blue-500 hover:bg-blue-500/80',
        className
      )}
    >
      {config.label}
    </Badge>
  );
}