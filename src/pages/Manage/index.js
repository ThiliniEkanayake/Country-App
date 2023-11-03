import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SearchForm from "./searchForm";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import DataTable from "./table";

const ManageCountries = ({}) => {
  const [countryName, setCountryName] = useState("");
  const [page, setPage] = useState(0); //Table Pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchedData, setSearchedData] = useState([]);
  const [tableRows, setTableRows] = useState([]); //Table Rows
  const [displayFilter, setDisplayFilter] = useState(false);

  //Get Default Data
  const getDefaultData = () => {
    const path = `https://restcountries.com/v3.1/all`;
    searchData(path);
  };

  //OnSubmit Function
  const handleOnSubmit = (event) => {
    event.preventDefault();

    const path = countryName
      ? `https://restcountries.com/v3.1/name/` + `${countryName}`
      : `https://restcountries.com/v3.1/all`;
    searchData(path);
  };

  //Reset Function
  const handleReset = (event) => {
    event.preventDefault();
    setCountryName("");
    getDefaultData();
  };

  //Search Function API call
  function searchData(path) {
    setPage(0);
    return fetch(path)
      .then((response) => response.json())
      .then((data) => setSearchedData(data));
  }

  useEffect(() => {
    getDefaultData();
  }, []);

  const rows = [];

  //This useEffect calls once the API is been called
  useEffect(() => {
    if (searchedData?.length) {
      searchedData?.map((item, index) => {
        rows.push({
          // id: item?.idd?.root,
          id: index + 1,
          no: index + 1,
          name: item?.name?.official,
          population: item?.population,
          capital: item?.capital?.[0],
          area: item?.area,
        });
      });
    }
    setTableRows(rows);
  }, [searchedData]);

  const displaySearchFunc = () => {
    setDisplayFilter(!displayFilter);
  };

  return (
    <>
      <Grid>
        <Grid style={{ paddingLeft: 100, paddingRight: 100 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Grid style={{ marginTop: 20 }}>
              <h2>Manage Countries</h2>
            </Grid>
            <Grid style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                onClick={displaySearchFunc}
                style={{ marginBottom: 10, backgroundColor: "#7A7D7B" }}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
          {/* Search Form */}
          {displayFilter ? (
            <SearchForm
              countryName={countryName}
              setCountryName={setCountryName}
              handleOnSubmit={handleOnSubmit}
              handleReset={handleReset}
            />
          ) : null}
        </Grid>
        {/* Data Table */}
        <Grid
          style={{
            marginTop: 15,
            paddingLeft: 100,
            paddingRight: 100,
            marginBottom: 20,
          }}
          justifyContent="center"
        >
          <Accordion
            sx={{
              boxShadow: 1,
              border: 1,
              borderColor: "#7A7D7B",
              "& .MuiDataGrid-cell:hover": {
                color: "#7A7D7B",
              },
            }}
          >
            <AccordionDetails>
              <DataTable
                tableRows={tableRows}
                setTableRows={setTableRows}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
};

export default ManageCountries;
