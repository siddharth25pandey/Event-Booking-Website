import React from "react";
import styles from "../Components/Styling/SeeAll.module.css";
import "../Components/Styling/sa.css";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../Redux/app/actions";
import CardSeeAll from "../Components/Card_seeAll";
import ReactPaginate from "react-paginate";
import { useEffect,useState } from "react";

const SeeAll = () => {
  

  const [language, SetLanguage] = React.useState(false);
  const [genre, SetGenre] = React.useState(false);
  const [filterLanguage, setFilterLanguage] = React.useState([]);
  const [filterGenre, setFilterGenre] = React.useState([]);
  const [event, setEvent] = React.useState([]);

  React.useEffect(() => {
    dispatch(getEvents());
    window.scrollTo(window.scrollX, 0);
  }, []);

  const events_data = useSelector((state) => state.app.events_data);
  const city = useSelector((state) => state.app.city);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setEvent(events_data);
  }, [events_data]);
  console.log(event);
  const filterEvents = () => {
    if (filterLanguage.length > 0) {
      const updated = event.filter((item) =>
        item.languages.includes(filterLanguage[filterLanguage.length - 1])
      );
      setEvent(updated);
    }
    if (filterGenre.length > 0) {
      let updated = [];
      let flg=1;
      for(let ii=0;ii<event.length;ii++){
        flg=1;
        let genre_m = [];
        for(let jj=0;jj<event[ii].genre.length;jj++){
          let n = event[ii].genre[jj].genre;
          genre_m.push(n);
        }
        for(let kk=0;kk<filterGenre.length;kk++){
          if(!genre_m.includes(filterGenre[kk])){
            flg=0;
          }
        }
        if(flg===1){
          updated.push(event[ii]);
        }
      }
      setEvent(updated);
    }
    if ( filterLanguage.length === 0 && filterGenre.length === 0) {
      setEvent(events_data);
    }
    updateevents();
  };

  React.useEffect(() => {
    if (
      filterLanguage.length === 0 &&
      filterGenre.length === 0 
    ) {
      setEvent(events_data);
    }
  }, [event]);
  const handleClear = (text) => {
    if (text === "languages") {
      setFilterLanguage([]);
    } else {
      setFilterGenre([]);
    }
    filterEvents();
  };

  const handleFilter = (language, genre) => {
    if (language !== "") {
      const index = filterLanguage.indexOf(language);
      if (index !== -1) {
        let newf = filterLanguage;
        newf.splice(index, 1);
        setFilterLanguage(newf);
      } else {
        let fff = filterLanguage;
        fff.push(language)
        setFilterLanguage(fff);
      }
    } else {
      const index = filterGenre.indexOf(genre);
      if (index !== -1) {
        filterGenre.splice(index, 1);
      } else {
        let fff = filterGenre;
        fff.push(genre)
        setFilterGenre(fff);
      }
    }
    filterEvents();
  };

  React.useEffect(() => {
    let lan = filterLanguage.includes("");
  });
  const itms = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  const[items, setItems]=useState(itms);
  const [pageNumber, setPageNumber]= useState(0);
  const itemsPerPage = 6
  const pagesVisited = pageNumber*itemsPerPage
  let displayItems=event.slice(pagesVisited, pagesVisited+itemsPerPage).map((item) => <CardSeeAll {...item} />)

  let PageCount = Math.ceil(event.length / itemsPerPage);
  const changePage = ({selected})=>{
      setPageNumber(selected);
  };
  
  const updateevents = () => {
    displayItems=event.slice(pagesVisited, pagesVisited+itemsPerPage).map((item) => <CardSeeAll {...item} />)
    PageCount = Math.ceil(event.length / itemsPerPage);
  }
  return (
    <div className={styles.container}>
      
      <div className={styles.leftsideNav}>
        <h2 style={{ background: "none", fontSize: "30px", fontWeight: "700", color: "white" }}>
          Filters
        </h2>
        <div style={{"borderRadius": "30px",	"borderWidth": "2px",	"borderStyle": "solid",	"borderColor": "fuchsia"}}>
          <div className={styles.header}>
            <div onClick={() => SetLanguage(!language)}>
              <span
                style={{
                  marginLeft: "10px",
                  color: "#e67088",
                  fontSize: "25px"
                }}
              >
                Languages
              </span>
            </div>
            <div onClick={() => handleClear("languages")} style={{fontSize: "15px"}}>Clear</div>
          </div>
          <div
            className={styles.dialogue}
           
          >
            <button
              style={
                filterLanguage.includes("Hindi")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("Hindi", "")}
            >
              Hindi
            </button>
            <button
              style={
                filterLanguage.includes("English")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("English", "")}
            >
              English
            </button>
            <button
              style={
                filterLanguage.includes("Telugu")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("Telugu", "")}
            >
              Telugu
            </button>
            <button
              style={
                filterLanguage.includes("Tamil")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("Tamil", "")}
            >
              Tamil
            </button>
            <button
              style={
                filterLanguage.includes("Japanese")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("Japanese", "")}
            >
              Japanese
            </button>
            <button
              style={
                filterLanguage.includes("Malyalam")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("Malyalam", "")}
            >
              Malyalam
            </button>
            <button
              style={
                filterLanguage.includes("Punjabi")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("Punjabi", "")}
            >
              Punjabi
            </button>
          </div>
        </div>

        <div style={{"borderRadius": "30px",	"borderWidth": "2px",	"borderStyle": "solid",	"borderColor": "fuchsia", "marginTop": "30px"}}>
          <div className={styles.header}>
            <div onClick={() => SetGenre(!genre)}>
              <span
                style={{
                  marginLeft: "10px",
                  color: "#e67088",
                  fontSize: "25px"
                }}
              >
                Genre
              </span>
            </div>
            <div onClick={() => handleClear("genre")} style={{fontSize: "15px"}}>Clear</div>
          </div>
          <div
            className={styles.dialogue}
          >
            <button
              style={
                filterGenre.includes("Action")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("", "Action")}
            >
              Action
            </button>
            <button
              style={
                filterGenre.includes("Drama")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("", "Drama")}
            >
              Drama
            </button>
            <button
              style={
                filterGenre.includes("Triller")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("", "Triller")}
            >
              Thriller
            </button>
            <button
              style={
                filterGenre.includes("Comedy")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("", "Comedy")}
            >
              Comedy
            </button>
            <button
              style={
                filterGenre.includes("Adventure")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("", "Adventure")}
            >
              Adventure
            </button>
            <button
              style={
                filterGenre.includes("Family")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("", "Family")}
            >
              Family
            </button>
            <button
              style={
                filterGenre.includes("Fantasy")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "borderStyle": "solid",	"borderColor": "#e67088"}
              }
              onClick={() => handleFilter("", "Fantasy")}
            >
              Fantasy
            </button>
          </div>
        </div>
      </div>

      <div>
        
        <h2
          style={{
            background: "none",
            fontSize: "30px",
            fontWeight: "700",
            marginLeft: "30px",
            color: "white"
          }}
        >
          All Events 
        </h2>
        <div className={styles.appliedFilter}>
          {[...filterLanguage, ...filterGenre].map((item) => (
            <div>{item}</div>
          ))}
        </div>
        <div className={styles.mainCards}>
            {displayItems}
        </div>
        <br/><br/>
        <center>
        <ReactPaginate  
             previousLabel={'<'}
             nextLabel={'>'}
             pageCount={PageCount}
             onPageChange={changePage}
             pageClassName={"hehehehe"}
             nextClassName={"nexthehe"}
             previousClassName={"prevhehe"}
             containerClassName={"paginationBttns"}
             previousLinkClassName={"previousBttn"}
             nextLinkClassName={"nextBttn"}
             disabledClassName={"paginationDisabled"}
             activeClassName={"paginationActive"}/>
        </center>
      </div>
      
    </div>
  );
};

export default SeeAll;
