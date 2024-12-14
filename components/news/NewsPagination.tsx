import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationLinkInternal,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { News } from '@/types/payload/payload-types';

interface Props {
    paginatedNews: PaginatedDocs<News>;
}

const NewsPagination = ({ paginatedNews: paginatedNews }: Props): ReactElement | null => {
    const locale = useLocale();

    if (paginatedNews.page === undefined) {
        return null;
    }

    const prevLink =
        paginatedNews.prevPage === 1 ? '/news' : `/news/pages/${paginatedNews.prevPage}`;

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                {paginatedNews.hasPrevPage && (
                    <>
                        <PaginationItem>
                            <PaginationPrevious
                                href={prevLink}
                                title={locale === 'de' ? 'Zurück' : 'Previous'}
                            />
                        </PaginationItem>

                        {paginatedNews.prevPage !== 1 && (
                            <>
                                <PaginationItem>
                                    <PaginationLink href="/news">1</PaginationLink>
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationEllipsis
                                        title={locale === 'de' ? 'Mehr Seiten' : 'More pages'}
                                    />
                                </PaginationItem>
                            </>
                        )}

                        <PaginationItem>
                            <PaginationLinkInternal href={prevLink}>
                                {paginatedNews.page - 1}
                            </PaginationLinkInternal>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationLink href="#" isActive={true}>
                        {paginatedNews.page}
                    </PaginationLink>
                </PaginationItem>

                {paginatedNews.hasNextPage && (
                    <>
                        <PaginationItem>
                            <PaginationLinkInternal href={`/news/pages/${paginatedNews.page + 1}`}>
                                {paginatedNews.page + 1}
                            </PaginationLinkInternal>
                        </PaginationItem>

                        {paginatedNews.nextPage !== paginatedNews.totalPages && (
                            <>
                                <PaginationItem>
                                    <PaginationLink
                                        href={`/news/pages/${paginatedNews.totalPages}`}
                                    >
                                        {paginatedNews.totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis
                                        title={locale === 'de' ? 'Mehr Seiten' : 'More pages'}
                                    />
                                </PaginationItem>
                            </>
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href={`/news/pages/${paginatedNews.page + 1}`}
                                title={locale === 'de' ? 'Weiter' : 'Next'}
                            />
                        </PaginationItem>
                    </>
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default NewsPagination;
