'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  activityId?: number;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ActivityDataErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ActivityDataErrorBoundary caught an error:', {
      error,
      errorInfo,
      activityId: this.props.activityId,
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='flex items-center gap-1 text-muted-foreground'>
          <AlertTriangle className='h-3 w-3' />
          <span className='text-xs'>Error loading data</span>
        </div>
      );
    }

    return this.props.children;
  }
}
