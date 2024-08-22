export default function translateSort(sortLines: string) {
    switch (sortLines.toLowerCase()) {
        case 'code':
            return 'коду';
        case 'categoryname':
            return 'категории';
        case 'name':
            return 'названию';
        case 'pricevalue':
            return 'цене';
        case 'stars':
            return 'рейтингу';
        default:
            return sortLines;
    }
}
