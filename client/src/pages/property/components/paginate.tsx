import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type TProps = {
  page: number;
  handlePage: Dispatch<SetStateAction<number>>;
  totalPages: number;
};
export const Paginate = ({ handlePage, page, totalPages }: TProps) => {
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
            onClick={() => handlePage(1)}
            disabled={page === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePage((old) => Math.max(old - 1, 0))}
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
                handlePage((old) => old + 1);
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
