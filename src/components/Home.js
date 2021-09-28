import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Match from "./Match";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";
import { Helmet } from "react-helmet-async";
// import { useGetData } from "../hooks/useGetData";
import app from '../firebase.config';

function Home(props) {
    const [documents, setDocuments] = useState([])
    const db=app.firestore();
    const FullDate = (dates) =>
      dates.toLocaleString("en-GB", {
        dateStyle: "long",
      });

      const dateToTime = (dates) =>
        dates.toLocaleString("en-GB", {
          hour12: false,
          hour: "2-digit",
          minute: "numeric",
        });
    let liveMatches = documents.filter((match)=>match.status === 'live');
    let pastMatches = documents.filter((match)=>match.status==="ft");
  
    const fetchMatches=async()=>{
        const response=db.collection('matches');
        response.get().then((querySnapshot) => {
          let matchData = [];
          const tempDoc = querySnapshot.docs.map((doc) => {
            let newMatch = doc.data();
            newMatch.id = doc.id
            if(newMatch.compRef){
              newMatch.compRef.get()
              .then(res =>{
                newMatch.league = res.data();
                matchData.push(newMatch);
              })
            }else{
              matchData.push(newMatch);
            }
            
            return newMatch;
          })
          setDocuments(tempDoc)
          // console.log(tempDoc)
        })
    }
    useEffect(() => {
        fetchMatches();
    }, []);
  return (
    <div>
      <Helmet>
        <script
          async="async"
          data-cfasync="false"
          src="//jelqr4dqeep7.com/0598f6fa244fae4bfda38c266a87dda5/invoke.js"
        ></script>
      </Helmet>
      <Container>
        <h2 className="heading display-6">Live Stream</h2>
        <small className="text-muted">
          <Link to="/fixtures">See All Fixtures</Link>
        </small>
        {/* <div className={loading ? "loading" : "hide"}></div> */}
        {/* <MatchesCheck /> */}
        <Row className="match-container">
          {liveMatches.map((obj) => {
            let raw_date = new Date(obj.matchday.seconds*1000);
            let matchday = FullDate(raw_date)
            let kickoff = dateToTime(raw_date);
            return (
              <Match
                key={`${obj.id}`}
                teamA={`${obj.teamA}`}
                teamB={`${obj.teamB}`}
                time={`${kickoff}`}
                matchday={`${matchday}`}
                match={`${obj.competition}`}
                link={`${obj.link}`}
                hide={`${obj.status}`}
                id={`${obj.id}`}
              />
            );
          })}
        </Row>
        <small>Advertisement</small>
        <div className="ads">
          <Iframe
            url="//jelqr4dqeep7.com/watchnew?key=3f59da4b039a9a15f3ef09ce6a8cef2d"
            width="728"
            height="90"
            frameborder="0"
            scrolling="no"
            align="center"
          />
        </div>
        <h2 className="heading display-6">Results</h2>
        <small className="text-muted">
          <Link to="/results" className="see-all">
            See All Results
          </Link>
        </small>
        {/* <div className={loading ? "loading" : "hide"}></div> */}
        <Row className="match-container">
          {pastMatches.map((obj) => {
            
            let raw_date = new Date(obj.matchday.seconds*1000);
            let matchday = FullDate(raw_date)
            console.log(obj.teamA, obj.league)
            return (
              <Match
                key={`${obj.id}`}
                teamA={`${obj.teamA}`}
                teamB={`${obj.teamB}`}
                time={`${obj.homeScore} - ${obj.awayScore}`}
                matchday={`${matchday}`}
                match={`${obj.league?obj.league:""}`}
                link={`${obj.link}`}
                hide={`${obj.status}`}
                id={`${obj.id}`}
              />
            );
          })}
        </Row>
        <small>Advertisement</small>
        <div id="container-0598f6fa244fae4bfda38c266a87dda5"></div>
      </Container>
    </div>
  );
}

export default Home;