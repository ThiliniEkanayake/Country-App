import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";

const SearchForm = ({
  countryName,
  setCountryName,
  handleOnSubmit,
  handleReset,
}) => {
  return (
    <>
      <form onSubmit={handleOnSubmit} onReset={handleReset}>
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
            <Grid
              container
              style={{ marginTop: 10 }}
              sx={{
                width: "45%",
              }}
            >
              <TextField
                id="outlined-required"
                label="Country Name"
                fullWidth
                value={countryName}
                onChange={(e) => {
                  setCountryName(e.target.value);
                }}
              />
            </Grid>
            <Grid container style={{ marginTop: 20 }} justifyContent="center">
              <Button
                variant="contained"
                type="submit"
                style={{ marginRight: 20, backgroundColor: "#7A7D7B" }}
              >
                Search
              </Button>
              <Button
                variant="contained"
                type="reset"
                style={{ backgroundColor: "#7A7D7B" }}
              >
                Reset
              </Button>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </form>
    </>
  );
};

export default SearchForm;
