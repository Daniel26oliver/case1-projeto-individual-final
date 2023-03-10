import React from 'react';
import Api from '../API/Api';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const DeleteModal = ({
  isModalOpen,
  setModalOpen,
  handleClose,
  selectedContent,
  reload,
  setReload,
}) => {
  const handleDelete = async () => {
    try {
      await Api().LIVRO_DELETE(selectedContent.id);
      setReload(!reload);
      toast.success('Livro excluído com sucesso!');
    } catch (err) {
      console.log(err.message);
      toast.error('Um erro ocorreu, tente novamente');
      throw new Error(err);
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={isModalOpen}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Deletar Livro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Deseja mesmo deletar o livro "<b>{selectedContent.titulo}</b>"?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="dark" onClick={handleDelete}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteModal;
