import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';

import { Form } from 'react-bootstrap';

interface File {
  uuid: string;
  path: string;
  name: string;
  type: string;
  size: number;
}

type ModalProps = {
  click: () => boolean;
  status: boolean;
  path: string;
  mode: string;
  fileList: File[];
}
type loaderProps = {
  src?: string;
};
export default function MkdirModal({click, status, path, mode, fileList}: ModalProps): JSX.Element {
  const [folderName, setFolderName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);

  const mkdir = async () => {
    if(folderName === '위로가기' || folderName === '휴지통'){
      setErrorMessage(' ※ 해당 이름은 사용 하실 수 없습니다.');
      setErrorVisible(true);
    }
    else{
      var overlapResult = false;
      for(var idx in fileList){
          if(folderName === fileList[idx].name){
            overlapResult = true;
            break;
          }
      }
      if(overlapResult){
        setErrorMessage(' ※ 이미 존재하는 폴더입니다.');
        setErrorVisible(true);
      }
      else{
        setErrorVisible(false);
        if(mode === 'public'){
          await axios.request({
            url: '/file/mkdirPublic/?path='+path+folderName,
            method: 'POST',
          });
          click();
        }
        else {
          const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
          if(accessToken !== null){
            const formData = new FormData();
            formData.append('token', accessToken);
            formData.append('path', path+folderName);
            await axios.request({
              url: '/file/mkdirPrivate',
              method: 'POST',
              data: formData,
            });
            click();
          }
          else{
            setErrorMessage(' ※ 회원정보를 확인할 수 없습니다. 다시 로그인 후 이용해주세요.');
            setErrorVisible(true);
          }
        }
      }
    }
  }
  
  return (
    <div>
      <Modal show={status} onHide={click} aria-labelledby="contained-modal-title-vcenter" centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{'새폴더 만들기'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="mkdirTextarea">
              <Form.Label>폴더 이름을 작성해 주세요.</Form.Label>
              <Form.Control as="textarea" rows={1} onChange={(e) => {setFolderName(e.target.value)}} placeholder='여기에 폴더 이름을 작성해 주세요'/>
            </Form.Group>
          {errorVisible && (
            <p className='text-danger'>{errorMessage}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={click}>
            닫기
          </Button>
          <Button variant="primary" onClick={mkdir}>
            폴더생성
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}