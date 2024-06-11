import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface Task {
  id: number;
  name: string;
}

interface ModalDeleteProps {
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
  taskToDelete: Task | null;
  handleDeleteTask: () => void;
}

export default function ModalDelete({
  showDeleteModal,
  setShowDeleteModal,
  taskToDelete,
  handleDeleteTask,
}: ModalDeleteProps) {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc chắn muốn xóa công việc{" "}
        <strong>{taskToDelete?.name}</strong> không?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDeleteTask}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
