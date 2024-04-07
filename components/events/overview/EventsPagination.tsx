import { useCallback } from 'react';
import { useRouter } from 'next/router';
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

    const { locale } = useRouter();

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlePriorPageClick}
                        href="#"
                        title={locale === 'de' ? 'Zurück' : 'Previous'}
                    />
                </PaginationItem>

                {displayFistPage && (
                    <>
                        <PaginationItem>
                            <PaginationLink onClick={handleFirstPageClick} href="#">
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis
                                title={locale === 'de' ? 'Mehr Seiten' : 'More pages'}
                            />
                        </PaginationItem>
                    </>
                )}

                {hasPrevPage && (
                    <PaginationItem>
                        <PaginationLink onClick={handlePriorPageClick} href="#">
                            {page - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationLink href="#" isActive={true}>
                        {page}
                    </PaginationLink>
                </PaginationItem>

                {hasNextPage && (
                    <PaginationItem>
                        <PaginationLink onClick={handleNextPageClick} href="#">
                            {page + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                {displayLastPage && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis
                                title={locale === 'de' ? 'Mehr Seiten' : 'More pages'}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={handleLastPageClick} href="#">
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={handleNextPageClick}
                        href="#"
                        title={locale === 'de' ? 'Weiter' : 'Next'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default EventsPagination;
