import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ModalEditProps {
  showEditModal: boolean;
  setShowEditModal: (show: boolean) => void;
  editTaskName: string;
  setEditTaskName: (name: string) => void;
  handleEditTask: () => void;
}

export default function ModalEdit({
  showEditModal,
  setShowEditModal,
  editTaskName,
  setEditTaskName,
  handleEditTask,
}: ModalEditProps) {
  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Sửa công việc</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          value={editTaskName}
          onChange={(e) => setEditTaskName(e.target.value)}
          placeholder="Tên công việc"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleEditTask}>
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
