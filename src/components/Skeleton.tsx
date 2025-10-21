import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  circle?: boolean;
}

export default function Skeleton({ 
  width = '100%', 
  height = '1em', 
  className = '', 
  circle = false 
}: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
      className={cn(
        "bg-gray-200 dark:bg-gray-700 animate-pulse rounded",
        circle ? "rounded-full" : "",
        className
      )}
      style={{ width, height }}
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={cn("p-6 space-y-4 bg-white dark:bg-gray-800 rounded-xl shadow-md", className)}>
      <Skeleton height="2rem" width="60%" />
      <Skeleton height="1rem" width="100%" /> 
      <Skeleton height="1rem" width="80%" />
      <div className="flex space-x-2"> 
        <Skeleton height="2rem" width="2rem" circle />
        <Skeleton height="2rem" width="2rem" circle />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton width="40px" height="24px" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton width="120px" height="24px" />
      </td> 
      <td className="px-6 py-4"> 
        <Skeleton width="200px" height="24px" />
      </td>
      <td className="px-6 py-4">
        <div className="space-y-2">
          <Skeleton width="150px" height="20px" />
          <div className="flex space-x-2">
            <Skeleton width="100px" height="20px" />
            <Skeleton width="30px" height="20px" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <Skeleton width="100px" height="24px" />
      </td>
    </tr>
  );
}