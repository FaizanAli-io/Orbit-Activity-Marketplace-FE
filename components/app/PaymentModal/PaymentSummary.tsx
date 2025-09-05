import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Activity } from '@/lib/data/activities/types';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

interface PaymentSummaryProps {
  activity: Pick<Activity, 'id' | 'name' | 'price' | 'location'>;
}

export function PaymentSummary({ activity }: PaymentSummaryProps) {
  const taxRate = 0.08; // 8% tax rate
  const subtotal = activity.price;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Activity Details */}
        <div className='space-y-3'>
          <h4 className='font-semibold text-base'>{activity.name}</h4>

          {activity.location && (
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <MapPin className='h-4 w-4' />
              <span>{activity.location}</span>
            </div>
          )}

          <Badge variant='secondary' className='text-xs'>
            Activity Subscription
          </Badge>
        </div>

        <Separator />

        {/* Pricing Breakdown */}
        <div className='space-y-3'>
          <div className='flex justify-between text-sm'>
            <span>Subscription Price</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className='flex justify-between text-sm'>
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <Separator />

          <div className='flex justify-between font-semibold text-base'>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        {/* Payment Security Info */}
        <div className='space-y-2'>
          <div className='flex items-center gap-2 text-xs text-muted-foreground'>
            <DollarSign className='h-3 w-3' />
            <span>Secure payment processing</span>
          </div>
          <div className='flex items-center gap-2 text-xs text-muted-foreground'>
            <Calendar className='h-3 w-3' />
            <span>Instant access after payment</span>
          </div>
        </div>

        {/* What's Included */}
        <div className='space-y-2'>
          <h5 className='font-medium text-sm'>What's included:</h5>
          <ul className='text-xs text-muted-foreground space-y-1'>
            <li>• Full access to the activity</li>
            <li>• Email confirmation</li>
            <li>• Calendar integration</li>
            <li>• Customer support</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
