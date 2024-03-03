import { useCallback } from 'react';
import type { ReactElement } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    paginatedEvents: PaginatedDocs<Event>;
    page: number;
    setPage: (page: number) => void;
}

const EventsPagination = ({ paginatedEvents: { totalPages, hasNextPage, hasPrevPage }, page, setPage }: Props): ReactElement | null => {

    const handleFirstPageClick = useCallback(() => setPage(1), [setPage]);
    const handlePriorPageClick = useCallback(() => setPage(page - 1), [page, setPage]);
    const handleNextPageClick = useCallback(() => setPage(page + 1), [page, setPage]);
    const handleLastPageClick = useCallback(() => setPage(totalPages), [totalPages, setPage]);

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex justify-center gap-2 items-center text-xl mt-4">
            <button
                className="cursor-pointer disabled:text-gray-300 disabled:cursor-default"
                onClick={handleFirstPageClick}
                disabled={page === 1}
            >
                <MdKeyboardDoubleArrowLeft />
            </button>

            <button
                className="cursor-pointer disabled:text-gray-300 disabled:cursor-default"
                onClick={handlePriorPageClick}
                disabled={!hasPrevPage}
            >
                <MdKeyboardArrowLeft />
            </button>

            <div className="cursor-pointer text-base">{page} / {totalPages}</div>

            <button
                className="cursor-pointer disabled:text-gray-300 disabled:cursor-default"
                onClick={handleNextPageClick}
                disabled={!hasNextPage}
            >
                <MdKeyboardArrowRight />
            </button>

            <button
                className="cursor-pointer disabled:text-gray-300 disabled:cursor-default"
                onClick={handleLastPageClick}
                disabled={page === totalPages}
            >
                <MdKeyboardDoubleArrowRight />
            </button>
        </div>
    );
};

export default EventsPagination;
