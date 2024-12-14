import { useCallback } from 'react';
import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    paginatedEvents: PaginatedDocs<Event>;
    page: number;
    setPage: (page: number) => void;
}

const EventsPagination = ({
    paginatedEvents: { totalPages, hasNextPage, hasPrevPage },
    page,
    setPage,
}: Props): ReactElement => {
    const handleFirstPageClick = useCallback(() => setPage(1), [setPage]);
    const handlePriorPageClick = useCallback(() => setPage(page - 1), [page, setPage]);
    const handleNextPageClick = useCallback(() => setPage(page + 1), [page, setPage]);
    const handleLastPageClick = useCallback(() => setPage(totalPages), [totalPages, setPage]);

    const displayFistPage = hasPrevPage && page !== 2;
    const displayLastPage = hasNextPage && page !== totalPages - 1;

    const locale = useLocale();

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlePriorPageClick}
                        title={locale === 'de' ? 'Zurück' : 'Previous'}
                    />
                </PaginationItem>

                {displayFistPage && (
                    <>
                        <PaginationItem>
                            <PaginationLink onClick={handleFirstPageClick}>1</PaginationLink>
                        </PaginationItem>

                        {page !== 3 && (
                            <PaginationItem>
                                <PaginationEllipsis
                                    title={locale === 'de' ? 'Mehr Seiten' : 'More pages'}
                                />
                            </PaginationItem>
                        )}
                    </>
                )}

                {hasPrevPage && (
                    <PaginationItem>
                        <PaginationLink onClick={handlePriorPageClick}>{page - 1}</PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationLink isActive={true}>{page}</PaginationLink>
                </PaginationItem>

                {hasNextPage && (
                    <PaginationItem>
                        <PaginationLink onClick={handleNextPageClick}>{page + 1}</PaginationLink>
                    </PaginationItem>
                )}

                {displayLastPage && (
                    <>
                        {page !== totalPages - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis
                                    title={locale === 'de' ? 'Mehr Seiten' : 'More pages'}
                                />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink onClick={handleLastPageClick}>
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={handleNextPageClick}
                        title={locale === 'de' ? 'Weiter' : 'Next'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default EventsPagination;
