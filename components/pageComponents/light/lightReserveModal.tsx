import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

type props = {
    setVisible: () => void;
    visible : boolean;
    room: string;
}

export default function MyVerticallyCenteredModal({setVisible, visible, room}:props) {

    useEffect(() => {
        
    },[]);
    return (
      <Modal
        show={visible}
        onHide={setVisible}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={setVisible}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }