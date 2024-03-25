import * as React from 'react';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import type { ReactElement } from 'react';
import type { ButtonProps } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>): ReactElement => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}
    />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn('flex flex-row items-center gap-1', className)}
        {...props}
    />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({
    className,
    isActive,
    size = 'icon',
    ...props
}: PaginationLinkProps): ReactElement => (
    <a
        aria-current={(isActive === true) ? 'page' : undefined}
        className={cn(
            buttonVariants({
                variant: (isActive === true) ? 'outline' : 'ghost',
                size,
            }),
            className
        )}
        {...props}
    />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
    className,
    title,
    ...props
}: React.ComponentProps<typeof PaginationLink>): ReactElement => (
    <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={cn('gap-1 pl-2.5', className)}
        {...props}
    >
        <ChevronLeftIcon className="h-4 w-4" />
        <span>{title}</span>
    </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
    className,
    title,
    ...props
}: React.ComponentProps<typeof PaginationLink>): ReactElement => (
    <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={cn('gap-1 pr-2.5', className)}
        {...props}
    >
        <span>{title}</span>
        <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
    className,
    title,
    ...props
}: React.ComponentProps<'span'>): ReactElement => (
    <span
        aria-hidden
        className={cn('flex h-9 w-9 items-center justify-center', className)}
        {...props}
    >
        <DotsHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">{title}</span>
    </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};
