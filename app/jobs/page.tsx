import { getAllJobs } from '@/lib/job-service'
import JobsClient from './jobs-client'

export const revalidate = 3600

export default async function JobsPage() {
  const jobs = await getAllJobs(false)
  return <JobsClient initialJobs={jobs} />
}
