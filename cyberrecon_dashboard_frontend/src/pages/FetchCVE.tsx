import React from 'react';
import { useForm } from 'react-hook-form';
import { WorkflowStepper, DataProgressPanel } from '../components/WorkflowAndData';

interface FormValues {
  query: string;
  severity: 'any' | 'low' | 'medium' | 'high' | 'critical';
}

/**
 * FetchCVE page placeholder with basic search form.
 * PUBLIC_INTERFACE
 */
export default function FetchCVE(): JSX.Element {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { query: '', severity: 'any' },
  });

  const onSubmit = (data: FormValues) => {
    // Placeholder: integrate React Query to fetch results from API.
    console.log('Fetch CVE submit:', data);
  };

  return (
    <div className="space-y-6">
      <WorkflowStepper />
      <DataProgressPanel />

      <div className="grid md:grid-cols-3 gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className="container-card p-4 md:col-span-2" aria-label="Vulnerability Search">
          <div className="container-header mb-3">Vulnerability Search</div>
          <div className="grid sm:grid-cols-4 gap-3 items-center">
            <input
              {...register('query')}
              placeholder="Search by CVE, keyword, product..."
              className="sm:col-span-3 bg-white/5 border-white/10 rounded-lg focus:ring-primary focus:border-primary"
              aria-label="Search query"
            />
            <select
              {...register('severity')}
              className="bg-white/5 border-white/10 rounded-lg focus:ring-primary focus:border-primary"
              aria-label="Severity filter"
            >
              <option value="any">Any Severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            <button type="submit" className="btn-primary sm:col-start-4" aria-label="Search">
              Search
            </button>
          </div>
        </form>

        <div className="container-card p-4">
          <div className="container-header mb-3">Filters</div>
          <div className="text-sm text-white/70">
            Placeholder for advanced filters (date range, vendor, CVSS range, etc.)
          </div>
        </div>
      </div>

      <div className="container-card p-4" id="panel-results" role="region" aria-label="Search results">
        <div className="container-header mb-3">Results</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-4 animate-pulse" aria-busy="true">
              <div className="h-4 bg-white/10 rounded w-2/3 mb-2" />
              <div className="h-3 bg-white/10 rounded w-1/2 mb-1" />
              <div className="h-3 bg-white/10 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
