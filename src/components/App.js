import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleModal } from '../actions/FavoriteCitiesActions';

import LocalWeather from './LocalWeather';
import Favorites from './Favorites';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import '../styles/App.css';

class App extends Component {
    handleClose = () => {
        this.props.handleModal();
    };

    render() {
        return (
            <>
                <Modal show={this.props.showModal} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.modalText}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div id='local-weather'>
                    <h2>Local weather</h2>
                    <LocalWeather />
                </div>
                <div id='favorites'>
                    <h2>Your favorite cities</h2>
                    <Favorites />
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ favoriteCities: { showModal, modalText } }) => {
    return {
        showModal: showModal,
        modalText: modalText
    };
};
const mapDispatchToProps = {
    handleModal: handleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(App);