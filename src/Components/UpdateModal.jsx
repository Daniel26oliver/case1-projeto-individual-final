import React from 'react';
import Api from '../API/Api';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const UpdateModal = ({
  isModalOpen,
  setModalOpen,
  handleClose,
  selectedContent,
  reload,
  setReload,
}) => {
  const [titulo, setTitulo] = React.useState('');
  const [genero, setGenero] = React.useState('');
  const [categoria, setCategoria] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (titulo && genero && categoria) {
      try {
        await Api().LIVRO_PUT(
          titulo,
          genero,
          categoria,
          selectedContent.id
        );
        setReload(!reload);
        toast.success('Livro atualizado com sucesso!');
      } catch (err) {
        console.log(err.message);
        toast.error('Um erro ocorreu, tente novamente');
        throw new Error(err);
      } finally {
        setModalOpen(false);
        setTitulo('');
        setGenero('');
        setCategoria('');
      }
    } else {
      toast.warn('Complete todos os dados para atualizar um livro');
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={isModalOpen}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Atualizar Livro</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="titulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                placeholder={selectedContent.titulo}
                type="text"
                value={titulo}
                onChange={({ target }) => setTitulo(target.value)}
              />
            </Form.Group>

            <Form.Group controlId="duracao">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                placeholder={selectedContent.duracao}
                type="text"
                value={genero}
                onChange={({ target }) => setGenero(target.value)}
              />
            </Form.Group>

            <Form.Group controlId="genero">
              <Form.Label>Gênero</Form.Label>
              <Form.Control
                placeholder={selectedContent.genero}
                type="text"
                value={categoria}
                onChange={({ target }) => setCategoria(target.value)}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="dark" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateModal;
