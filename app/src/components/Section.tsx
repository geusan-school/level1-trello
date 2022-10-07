import {
  Box,
  Button,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskType, TrelloContext } from "../../pages";

export default function Section({
  title: sectionTitle,
  index,
}: {
  title: string;
  index: number;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: updateModalIsOpen,
    onClose: onUpdateModalClose,
    onOpen: onUpdateModalOpen,
  } = useDisclosure();
  const [currentId, setCurrentId] = useState(-1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const openCreateModal = () => onOpen();
  const {
    addTask: handleAddTask,
    tasks: sections,
    moveTask,
    deleteTask,
    swapTask,
    updateTask: handleUpdateTask,
  } = useContext(TrelloContext);
  const tasks = sections[index];
  const addTask = () => {
    // 카드 추가
    handleAddTask?.(index, {
      id: Date.now(),
      title: title,
      description,
    });
    // 입력값 초기화
    setTitle("");
    setDescription("");
    // 모달 닫기
    onClose();
  };
  const openUpdateModal = (task: TaskType) => {
    onUpdateModalOpen();
    setTitle(task.title);
    setDescription(task.description);
    setCurrentId(task.id);
  };
  const updateTask = () => {
    const task = tasks.find((t) => t.id === currentId);
    if (!task) return;
    task.title = title;
    task.description = description;
    handleUpdateTask(index, task);
    setTitle("");
    setDescription("");
    onUpdateModalClose();
  };
  const moveUpTask = (task: TaskType) => {
    swapTask(index, task, -1);
  };
  const moveDownTask = (task: TaskType) => {
    swapTask(index, task, 1);
  };
  const moveRightTask = (task: TaskType) => {
    moveTask(index, index + 1, task);
  };
  const moveLeftTask = (task: TaskType) => {
    moveTask(index, index - 1, task);
  };
  return (
    <Box bg="tomato" flex={1} borderRadius={4} p={4}>
      <Heading>{sectionTitle}</Heading>
      <Button onClick={openCreateModal}>할일 추가</Button>
      <Droppable droppableId={`${index}`}>
        {(droppableProvided, snapshot) => (
          <Stack ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
            {tasks.map((task, ind) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={ind}>
                {(draggableProvided, snapshot) => (
                  <Box bg="cyan.200" p={4} borderRadius={4} userSelect="none" ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                    <Heading fontSize="md">{task.title}</Heading>
                    <Text>{task.description}</Text>
                    <Button onClick={() => deleteTask(index, task)}>삭제</Button>
                    <Button onClick={() => openUpdateModal(task)}>수정</Button>
                    <Button onClick={() => moveUpTask(task)}>위로</Button>
                    <Button onClick={() => moveDownTask(task)}>아래로</Button>
                    <Button onClick={() => moveLeftTask(task)}>왼쪽으로</Button>
                    <Button onClick={() => moveRightTask(task)}>
                      오른쪽으로
                    </Button>
                  </Box>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </Stack>
        )}
      </Droppable>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>할일 추가</ModalHeader>
          <ModalBody>
            <Input
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={addTask}>추가하기</Button>
            <Button variant="text" onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={updateModalIsOpen} onClose={onUpdateModalClose}>
        <ModalContent>
          <ModalHeader>카드 수정</ModalHeader>
          <ModalBody>
            <Input
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={updateTask}>수정하기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
