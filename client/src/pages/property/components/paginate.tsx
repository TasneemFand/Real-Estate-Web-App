import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";
import { useQueryKeys } from "../hooks/useQueryKeys";

type TProps = {
  totalPages: number;
};
export const Paginate = ({ totalPages }: TProps) => {
  const { page, onPageChange } = useQueryKeys();

  return (
    <div className="mt-auto flex items-center justify-between px-2 py-2">
      <div className="flex-1 text-sm text-secondary-foreground">
        Showing 1 to 10 Propertys
      </div>
      <div className="flex flex-wrap items-center">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium text-foreground">
          Page {totalPages === 0 ? 0 : page} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(1)}
            disabled={page === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(Math.max(page - 1, 0))}
            disabled={page === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              if (page < totalPages) {
                onPageChange(page + 1);
              }
            }}
            disabled={page === totalPages || totalPages === 0}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
