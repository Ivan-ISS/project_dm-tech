import * as styles from './pagination.module.scss';
import { useEffect, useState, useRef } from 'react';
import getPaginationView from '@/utils/getPaginationView';
import ArrowLeft from '@/assets/images/svg/arrowLeft.svg';
import ArrowRight from '@/assets/images/svg/arrowRight.svg';
import SecondaryButton from '../Buttons/SecondaryButton/secondaryButton';

export interface PaginationProps {
    totalPages: number;
    resetPage: unknown;
    handlePagination: (currentPage: number) => void;
}

export default function Pagination({ totalPages, resetPage, handlePagination }: PaginationProps) {
    const [showPages, setShowPages] = useState<(string | number)[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setCurrentPage(1);
    }, [resetPage]);

    useEffect(() => {
        setShowPages(getPaginationView(totalPages, currentPage));
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        handlePagination(currentPage);
    }, [currentPage, handlePagination, totalPages]);

    return (
        <div className={styles.pagination}>
            <SecondaryButton
                edges={'rounded'}
                adaptive={true}
                onClick={() => setCurrentPage(currentPage - 1)}
                isDisabled={currentPage === 1 || totalPages === 0}
            >
                <ArrowLeft width={20} height={20} />
            </SecondaryButton>
            {showPages.map((page, index) => (
                <SecondaryButton
                    key={index}
                    text={page}
                    edges={'rounded'}
                    adaptive={true}
                    isActive={page === currentPage}
                    onClick={typeof page === 'number' ? () => setCurrentPage(page) : () => null}
                />
            ))}
            <SecondaryButton
                edges={'rounded'}
                adaptive={true}
                onClick={() => setCurrentPage(currentPage + 1)}
                isDisabled={currentPage === totalPages || totalPages === 0}
            >
                <ArrowRight width={20} height={20} />
            </SecondaryButton>
        </div>
    );
}
