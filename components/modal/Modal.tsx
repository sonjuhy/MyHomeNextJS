import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type ModalProps = {
  click: () => boolean;
  status: boolean;
  info: string;
}

function StaticExample({click, status, info}: ModalProps): JSX.Element {

  return (
    <div>
      <Modal show={status} onHide={click}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you`&apos;`re reading this text in a modal! {info}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={click}>
            Close
          </Button>
          <Button variant="primary" onClick={click}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StaticExample;