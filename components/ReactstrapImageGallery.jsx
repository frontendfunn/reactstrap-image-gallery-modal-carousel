import React from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Col,
  Row,
  Container,
  Card,
  CardImgOverlay,
  CardImg,
  Button
} from "reactstrap";

import ImageCarousel from "./ImageCarousel";

class ReactstrapImageGallery extends React.Component{
  contructor(props){
    super(props);
    this.state={
      isModalOpen:false, // state for the modal popup
      images:[], // images array we receive from the parent
      imagesToShow:0, // limit 
      currentIndex:0 // used for the carousel
    }
  }
  static getDerivedStateFromProps(props,state){
    const {images,limit} = props;
    const imagesToShow = props.hasOwnProperty("limit") ? limit : 6;
    return {images,imagesToShow};
  }

// for toggling the modal state
  toggleModal = () => {
    this.setState({
      isModalOpen:!this.state.isModalOpen
    })
  }

// used to set the current index of the carousel
showModalImage = imageId => {
  this.toggleModal();
  this.setState({
    currentIndex:imageId
  })
}


  render(){
    const {isModalOpen,images,imagesToShow,currentIndex} = this.state;
    const tempImagesArray = images.slice(0,imagesToShow); //temporary array
    const hasMore = images.length !== 0 ? images.length - imagesToShow : 0;
    
    return <Container>
    <Row>
    <Col md={{size:10,offset:1}} className="thumbnail-gallery">
   <h5 className="text-center my-3">Reactstrap Image Gallery </h5>
<Row>
    {tempImagesArray.map((image, index) => (
            <Col
              md="3"
              className="my-2"
              key={index}
              onClick={() => this.showModalImage(index)}
            >
              <Card className="image-card">
                <CardImg src={image.url} />
                {hasMore !== 0 && index === imagesToShow - 1 ? (
                  <CardImgOverlay className="overlay">
                    <h2 className="mb-0">{hasMore}</h2>
                    <small> More </small>
                  </CardImgOverlay>
                ) : null}
              </Card>
            </Col>
          ))}
    </Row>
    </Col>
    </Row>

      <Modal
          className="modal-xl"
          isOpen={isModalOpen}
          toggle={this.toggleModal}
        >
          <ModalHeader>Image Gallery</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <ImageCarousel images={images} currentIndex={currentIndex} />
              </Col>
            </Row>
          </ModalBody>
        </Modal>
    

    </Container>;
  }
}

export default ReactstrapImageGallery;