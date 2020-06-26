import React, { Component }from 'react';
import PropTypes from 'prop-types';
import GridGallery from 'react-grid-gallery';
import '../styles/Gallery.css'

export class Gallery extends Component {
 static propTypes = {
   images: PropTypes.arrayOf(
     PropTypes.shape({
       user: PropTypes.string.isRequired,
       src: PropTypes.string.isRequired,
       thumbnail: PropTypes.string.isRequired,
       caption: PropTypes.string,
       thumbnailWidth: PropTypes.number.isRequired,
       thumbnailHeight: PropTypes.number.isRequired
     })
   ).isRequired
 }

 render() {
   const images = this.props.images.map((image) => {
     return {
       ...image,
       customOverlay: (
         // <div style={captionStyle}>
         <div className="overlay">
           <div>{`${image.user}: ${image.caption}`}</div>
         </div>
       ),
     };
   });

   return (
     <div style={wrapperStyle}>
       <GridGallery
         backdropClosesModal = {true}
         images={images}
         enableImageSelection={false}/>
     </div>
   );
 }
}

const wrapperStyle = {
 display: "block",
 minHeight: "1px",
 width: "100%",
 border: "1px solid #ddd",
 overflow: "auto",
};

// const captionStyle = {
//  backgroundColor: "rgba(0, 0, 0, 0.8)",
//  maxHeight: "60px",
//  overflow: "hidden",
//  position: "absolute",
//  bottom: "0",
//  width: "100%",
//  color: "white",
//  padding: "2px",
//  fontSize: "90%"
// };
