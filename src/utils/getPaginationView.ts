export default function getPaginationView(
    totalPages: number,
    currentPage: number
): (string | number)[] {
    if (totalPages > 7) {
        if (currentPage === 3) {
            return [2, 3, 4, '...', totalPages - 2, totalPages - 1, totalPages];
        } else if (currentPage === totalPages - 2) {
            return [1, 2, 3, '...', totalPages - 3, totalPages - 2, totalPages - 1];
        } else if (currentPage > 3 && currentPage < totalPages - 2) {
            return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
        } else {
            return [1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages];
        }
    }

    if (totalPages > 5 && totalPages <= 7) {
        if (currentPage > 3 && currentPage < totalPages - 2) {
            return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
        } else if (currentPage >= totalPages - 2) {
            return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            return [1, 2, 3, 4, '...', totalPages];
        }
    }

    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    return [];
}
