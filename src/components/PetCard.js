import React, { Component } from 'react';

class PetCard extends Component {

  capitalizeFirstLetter( string ) {
    string = string.trim();
    return string[0].toUpperCase() + string.slice(1);
  }

  makeUrl( string ) {
    return string.trim().replace(/\s/g, "-");
  }

  // Capitalize first letter of each name, truncate last name
  formatName( first, last ) {
    first = this.capitalizeFirstLetter( first );

    if( last ) {
      last = last[0].toUpperCase() + ".";
    }

    return first + " " + last;
  }

  // Truncate a string given a maxLength.
  truncate( input, maxLength ) {
    input = input.split(" ");
    var output = "";

    for( var i = 0; i < input.length; i++) {
      var word = input[i];
      if( output.length + word.length < maxLength) {
        output += word + " ";
      }
      else if( output.length + word.length > maxLength ) {
        output = output.trim() + "..."; // Adds ... for strings longer than the maxLength
        break;
      }
      else {
        output.trim();
        break;
      }
    }

    return output;
  }

  render() {
    var title = this.capitalizeFirstLetter( this.props.title );
    var url = this.makeUrl( this.props.title );
    var name = this.formatName( this.props.first, this.props.last );
    var petName = this.formatName( this.props.petName, "" );
    var description = this.truncate( this.props.description, 48 );

    return (
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <div className="card">
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">{title}<i className="material-icons right">more_vert</i></span>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">{name} | {petName}<i className="material-icons right">close</i></span>
              <p>{description}</p>
            </div>
            <div className="card-action">
              <a href={url}>See more</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PetCard;
