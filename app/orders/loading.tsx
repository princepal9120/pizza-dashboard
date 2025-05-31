import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export default function OrdersLoading() {
  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-8">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
        
        <Card className="w-full p-6 space-y-4">
          {Array(8).fill(null).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </Card>
      </div>
    </DashboardLayout>
  );
}