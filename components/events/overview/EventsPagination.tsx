import { useCallback } from 'react';
import type { ReactElement } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    paginatedEvents: PaginatedDocs<Event>;
    currentPage: number;
    setPage: (page: number) => void;
}

const EventsPagination = ({ paginatedEvents: { page, totalPages, hasNextPage, hasPrevPage }, currentPage, setPage }: Props): ReactElement => {

    const handleFirstPageClick = useCallback(() => setPage(1), [setPage]);
    const handlePriorPageClick = useCallback(() => setPage(page ?? currentPage - 1), [currentPage, page, setPage]);
    const handleNextPageClick = useCallback(() => setPage(page ?? currentPage + 1), [currentPage, page, setPage]);
    const handleLastPageClick = useCallback(() => setPage(totalPages), [totalPages, setPage]);

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

            <div className="cursor-pointer text-base">{page ?? currentPage} / {totalPages}</div>

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
