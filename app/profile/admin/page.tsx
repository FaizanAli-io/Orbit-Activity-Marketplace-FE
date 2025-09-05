import Block from '@/app/layout/Block';
import { StatsGrid, TableSection } from './components';

const AdminDashboard = async () => {
  return (
    <Block>
      <div className='space-y-6'>
        {/* Page Header */}
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Admin Dashboard</h1>
          <p className='text-muted-foreground'>
            Overview of your platform's key metrics and user management.
          </p>
        </div>

        {/* Stats Cards */}
        <StatsGrid />

        {/* Tables Section */}
        <TableSection />
      </div>
    </Block>
  );
};

export default AdminDashboard;
