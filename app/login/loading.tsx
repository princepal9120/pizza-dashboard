import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function LoginLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-md p-8">
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </CardHeader>
          <CardContent className="grid gap-4">
            <Skeleton className="h-10 w-full" />
          </CardContent>
          <CardFooter className="flex flex-col">
            <Skeleton className="h-4 w-5/6" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}