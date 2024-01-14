import { getRandomBeerList } from '../../api';
import { Beer, SORT, SORT_TYPE } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList(10);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

const paginate = (array: Array<Beer>, pageSize: number) => {
  const pageCount = Math.ceil(array.length / pageSize);
  return Array.from({ length: pageCount }, (_, index) =>
    array.slice(index * pageSize, (index + 1) * pageSize)
  );
};
const filterHandler = (array: Array<Beer>, selectType:string, ) => {
     const filteredBeer =
       selectType === ""
         ? array
      : array.filter((beer) => beer.brewery_type === selectType);
  return filteredBeer
}
 const handleSort = (array: Array<Beer>, field: SORT_TYPE, order: SORT) => {
   const sorted = [...array].sort((a, b) => {
     if (order === "asc") {
       return field === "name"
         ? a.name.localeCompare(b.name)
         : a.brewery_type.localeCompare(b.brewery_type);
     } else {
       return field === "name"
         ? b.name.localeCompare(a.name)
         : b.brewery_type.localeCompare(a.brewery_type);
     }
   });
   console.log("sorted is ", sorted);
   // setBeerList(sorted);
   //setSortField(field);
   return sorted;
 };

export { fetchData, paginate, filterHandler, handleSort  };
