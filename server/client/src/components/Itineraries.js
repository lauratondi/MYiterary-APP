import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchItinerariesList } from '../store/actions/itinerariesActions'
import userIcon from '../images/userIcon.png'
import { Link } from 'react-router-dom';
import Activities from './Activities'
import { Button, UncontrolledCollapse } from 'reactstrap';


class Itineraries extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     // itineraries: [],
        //     // city: "",
        //     // fetchItineraryList: [],
        //     // activities:[]
        // } I don't need them anymore because I created my own back end
    }

    componentDidMount() {
        let city = window.location.pathname.split('/')[2]
        this.props.fetchItinerariesList(city);
    }


    render() {

        const { itineraries } = this.props;

        console.log(itineraries)
        console.log(this.props.itineraries)

        const itinerariesList = itineraries.map(itinerary => {

            return (
                <div className="itineraryItem" key={itinerary._id} >

                    <div className="user">
                        <img src={userIcon} alt="userPhoto" />
                        <p>UserName</p>
                    </div>

                    <div className="titleIt">
                        <h3> {itinerary.title} </h3>
                    </div>

                    <div className="detailsIt">
                        <p>Likes:{itinerary.rating}</p>
                        <br></br>
                        <p>{itinerary.duration}</p>
                        <br></br>
                        <p>{itinerary.price} </p>
                    </div>
                    <div className="hashtag">
                        <p>{itinerary.hashtag}</p>
                    </div>

                    <div className="viewAll">
                        
                        <Button color="tranparent" id="toggler" >
                          <p>v View All v</p>  
                        </Button>
                       
                        <UncontrolledCollapse toggler="#toggler">
                            <Activities activities={itinerary.activities} />
                        </UncontrolledCollapse>

                    </div>

                </div>
            )
        })


        const { loading } = this.props;

        if (!loading)
            return (
                <div className="flex-container">

                    <div className="itineraries-list">
                        <h2>City:</h2>
                        <h3> Available MYtineraries:</h3>
                        {itinerariesList}

                        <Link to="/cities">
                            <center>Chose another city...</center>
                        </Link>
                    </div>

                </div>
            )
        else
            return (
                <div>Loading itineraries...</div>
            )
    }
}


const mapStateToProps = state => {
    return {
        itineraries: state.itineraries.itineraries,
        loading: state.itineraries.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchItinerariesList: (city) => dispatch(fetchItinerariesList(city))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Itineraries)