import { useEffect, useState } from 'react';
import { fetchData, paginate,  filterHandler, handleSort } from './utils';
import { Beer, SORT, SORT_TYPE } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link, Pagination, Box  } from '@mui/material';
import styles from './Home.module.css';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  
  const [selectedBreweryType, setSelectedBreweryType] = useState<string>("");
  
  //sorting
  const [sortOrder, setSortOrder] = useState<SORT>("asc");
  const [sortField, setSortField] = useState<SORT_TYPE>("name");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  
 // eslint-disable-next-line
   useEffect(fetchData.bind(this, setBeerList), []);

   // filtering
 const filteredBeer = filterHandler(beerList, selectedBreweryType);
   
 // sorting    
const sortedList = handleSort(filteredBeer, sortField, sortOrder);
// pagination
const itemsPerPage = 5 as number;
const paginatedBeerList = paginate(sortedList, itemsPerPage); 
const currentBeerList = paginatedBeerList[currentPage - 1];

const [checkedBeers, setCheckedBeers] = useState(Array(currentBeerList.length).fill(false));


  function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedBreweryType(event.target.value);
    setCurrentPage(1);
  }

  function handleReset() {
    setSelectedBreweryType("");
    setSortOrder("asc")
    setSortField("name")
    setCurrentPage(1);
  }

  function handleSortOrderChange (order: SORT){
    setSortOrder(order);
    setCurrentPage(1);
  };
  function handleSortChange (event: React.ChangeEvent<HTMLSelectElement>) {
    setSortField(event.target.value as SORT_TYPE);
  };

  function PaginationHandler(e:Object, newPage: number) {
   setCurrentPage(newPage);
  }


  const handleSavedBeers = (index: number, name: string)  => {
     
    // Check if the beer is already in the savedList
    const beerAlreadyExists = savedList.some((item) => item.id === currentBeerList[index].id);
  
    // If the beer already exists, remove it; otherwise, add it
 (!beerAlreadyExists && currentBeerList[index].name === name)?
        setSavedList([...savedList, currentBeerList[index]]):
        setSavedList(savedList.filter((item) => item.id!== currentBeerList[index].id));
        // setCheckedBeers(savedList.map((item) => item.id === currentBeerList[index].id));
      }
   
 

  

  return (
    <article>
      <section>
        <main className='beer'>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <div className={styles.filter}>
                  <TextField
                    label="Filter by brewery type..."
                    variant="outlined"
                    value={selectedBreweryType}
                    onChange={handleFilter}
                    fullWidth
                    className={styles.search}
                  ></TextField>
                </div>

                <div className={styles.sort}>
                  <label>
                    Sort by:
                    <select value={sortField} onChange={handleSortChange}>
                      <option value="name">Name</option>
                      <option value="brewery_type">Brewery type</option>
                    </select>
                  </label>
                  <button onClick={() => handleSortOrderChange("asc")}>
                    Ascending
                  </button>
                  <button onClick={() => handleSortOrderChange("desc")}>
                    Descending
                  </button>
                </div>
                <Button variant='contained' onClick={handleReset}>
                Reload list
                </Button>
                </div>
                 <ul className={styles.list}>
                  {currentBeerList &&
                  currentBeerList.map((beer, index) => (
                    <li key={index.toString()}>
                    <Checkbox key={index} checked={checkedBeers[index]}
                      onClick={()=>handleSavedBeers(index, currentBeerList[index].name )} />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
                {paginatedBeerList.length > 1 && (
                <Box mt={2} display="flex" justifyContent="center">
                  <Pagination
                    count={paginatedBeerList.length}
                    page={currentPage}
                    onChange={PaginationHandler}
                    
                  />
                </Box>
              )}
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant='contained' size='small' onClick = {()=> setSavedList([])}>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
  }
export default Home;
















