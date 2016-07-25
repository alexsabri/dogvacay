import React, { Component } from 'react';
import PetCard from 'components/PetCard';
import _ from 'lodash';

var Search = React.createClass({
  getInitialState: function() {
    return {
      results: [],
      searchType: null // Toggle the state of the search buttons
    };
  },

  componentWillMount: function() {
    this._getAll();
  },

  _getAll: function() {
    var that = this;
    that.setState({
      results: [],
      searchType: null
    });

    setTimeout( function() {
      $.get('http://localhost:3000/static/search.json', {}, function( data ) {
        that.setState({
          results: data.search,
          searchType: null
        });
      }).fail( function( data ) {
        console.log(data);
      });
    }, 1000);
  },

  _getBoarding: function() {
    var that = this;
    this.setState({
      results: [],
      searchType: "boarding"
    });

    // Simulate time elapsed for GET request
    setTimeout( function() {
      $.get('http://localhost:3000/static/search.json', {
        'service': 'boarding'
      }, function( data ) {
        that.setState({
          results: data.search
        });
      }).fail( function( data ) {
        console.log(data);
        that._getAll();
      });
    }, 2500);
  },

  _getSitting: function() {
    var that = this;
    this.setState({
      results: [],
      searchType: "sitting"
    });

    // Simulate time elapsed for GET request
    setTimeout( function() {
      $.get('http://localhost:3000/static/search.json', {
        'service': 'sitting'
      }, function( data ) {
        that.setState({
          results: data.search,
        });
      }).fail( function( data ) {
        console.log(data);
        that._getAll();
      });
    }, 2500);
  },

  render: function() {
    var resultsEl;

    // Display loader if we are waiting for content to load
    if( _.isEmpty( this.state.results ) ) {
      resultsEl = (
        <div className="progress" style={{
            margin: "0",
            height: "2px"
          }}>
          <div className="indeterminate"></div>
        </div>
      );
    }
    else {
      resultsEl = _.map( this.state.results, function(item) {
        // Pass the needed props to PetCard
        // Catch any errors in JSON object (key/value pairs) (e.g. description vs desciption )
        return <PetCard
          key={ item.pet.id }
          title={ item.title }
          first={ item.user.first }
          last={ item.user.last }
          petName={ item.pet.name }
          description={ item.description || item.desciption }
        />
      });
    }

    var dogVacayLogoStyle = {
      backgroundImage: "url('https://cdn.havekarma.com/img/brands/dogvacay-logo.png')",
      width: "200px",
      height: "64px",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50%"
    };

    var boardingBtnClass = "waves-effect waves-light btn";
    var sittingBtnClass = "waves-effect waves-light btn";
    if( this.state.searchType && this.state.searchType === "boarding" ) {
      boardingBtnClass += " red lighten-1";
    }
    else if( this.state.searchType && this.state.searchType === "sitting" ) {
      sittingBtnClass += " red lighten-1";
    }

    return (
      <div>
        <nav>
          <div className="nav-wrapper grey lighten-4">
            <a href="#" className="brand-logo"><div className="dogvacay-logo" style={dogVacayLogoStyle}></div></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a className={boardingBtnClass} onClick={this._getBoarding}>Boarding</a></li>
              <li><a className={sittingBtnClass} onClick={this._getSitting}>Sitting</a></li>
            </ul>
          </div>
        </nav>
        {resultsEl}
      </div>
    );
  }
});

export default Search;
