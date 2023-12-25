import React, { useCallback, useState } from "react";
import { HiOutlineTrash, HiOutlineChevronDown, HiPlus, HiPlusCircle, HiMinusCircle } from "react-icons/hi";
import { colors, inputType } from "../../constants/AppConstants";
import CheckListItem from "../CheckListItem";
import useAuthStore from "../../store/Auth";
import useUserChecklistStore from "../../store/Checklist";
import { mydatabase } from "../../database";
import { v4 as uuidv4 } from 'uuid';

function Checklist() {
    const [newChecklistTitle, setNewChecklistTitle] = useState<string>("");
    const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
    const [selectedChecklistIndex, setSelectedChecklistIndex] = useState<number>(-1);
    const [newTaskText, setNewTaskText] = useState<string>("");

    const user = useAuthStore(store => store.user)
    const setUserData = useAuthStore(store => store.setUserData)
    const setIsLoggedIn = useAuthStore(store => store.setIsLoggedIn)
    const setUserChecklist = useUserChecklistStore(store => store.setUserChecklist)
    const userChecklist = useUserChecklistStore(store => store.userChecklist)

    const getRandomColor = useCallback(() => {
        const random = Math.floor(Math.random() * colors.length);
        return colors[random];
    }, []);

    const getRandomInputType = useCallback(() => {
        const random = Math.floor(Math.random() * inputType.length);
        return inputType[random];
    }, []);

    const handleNewChecklist = useCallback(async () => {
        const checklistId = uuidv4();

        if (newChecklistTitle.trim() !== "") {
            const checklistItem = await mydatabase.checklists.insert({
                checklistId,
                userId: user.userId,
                title: newChecklistTitle,
                tasks: [],
            });

            const newChecklistItem = { checklistId: checklistItem._data.checklistId, userId: user.userId, title: checklistItem._data.title, tasks: [] }

            setUserChecklist([...userChecklist, newChecklistItem])
            setNewChecklistTitle("");
        }
    }, [userChecklist, newChecklistTitle, setUserChecklist, user.userId]);

    const handleOpenTaskModal = useCallback((index: number) => {
        setSelectedChecklistIndex(index);
        setShowTaskModal(true);
        setNewTaskText("");
    }, []);

    const handleCloseTaskModal = useCallback(() => {
        setShowTaskModal(false);
    }, []);

    const handleCreateTask = useCallback(async () => {
        if (newTaskText.trim() !== "" && selectedChecklistIndex !== -1) {
            const checklistId = userChecklist[selectedChecklistIndex].checklistId;

            const task = {
                text: newTaskText,
                indicatorColor: getRandomColor(),
                inputType: getRandomInputType(),
            };

            const checklistItem = await mydatabase.checklists.findOne(checklistId).exec();
            checklistItem.tasks.push(task);

            await checklistItem.update();

            const updatedChecklists = [...userChecklist];
            updatedChecklists[selectedChecklistIndex].tasks.push(task);
            setUserChecklist(updatedChecklists);

            setNewTaskText("");
            setShowTaskModal(false);
        }
    }, [newTaskText, selectedChecklistIndex, setUserChecklist, userChecklist, getRandomColor, getRandomInputType]);

    const handleDeleteChecklist = useCallback(async (index: number) => {
        if (index >= 0 && index < userChecklist.length) {
            const checklistId = userChecklist[index].checklistId;

            const checklistItem = await mydatabase.checklists.findOne(checklistId).exec();
            if (checklistItem) {
                await checklistItem.remove();
            }

            const updatedChecklists = [...userChecklist];
            updatedChecklists.splice(index, 1);
            setUserChecklist(updatedChecklists);
        }
    }, [userChecklist, setUserChecklist]);


    const handleDeleteTask = useCallback(async (checklistIndex: number, taskIndex: number) => {
        if (
            checklistIndex >= 0 &&
            checklistIndex < userChecklist.length &&
            taskIndex >= 0 &&
            taskIndex < userChecklist[checklistIndex].tasks.length
        ) {
            const checklistId = userChecklist[checklistIndex].checklistId;
            const taskId = userChecklist[checklistIndex].tasks[taskIndex].id;

            const checklistItem = await mydatabase.checklists.findOne(checklistId).exec();
            if (checklistItem) {
                const updatedTasks = checklistItem.tasks.filter((task: any) => task._id !== taskId);
                checklistItem.tasks = updatedTasks;
                await checklistItem.update();
            }

            const updatedChecklists = [...userChecklist];
            updatedChecklists[checklistIndex].tasks.splice(taskIndex, 1);
            setUserChecklist(updatedChecklists);
        }
    }, [userChecklist, setUserChecklist]);

    const handleCreateChecklistKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleNewChecklist();
        }
    }, [handleNewChecklist])

    const handleCreateTaskKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCreateTask();
        }
    }, [handleCreateTask])

    const handleLogout = useCallback(() => {
        setUserData({ userId: '', email: '' })
        setIsLoggedIn(false)
    }, [setIsLoggedIn, setUserData])

    return (
        <div className="bg-blue-primary px-6 lg:px-36 py-6">
            <div className="px-5">
                <button
                    className="text-white font-semibold p-3 rounded-xl cursor-pointer bg-purple-primary text-[10px] lg:text-sm"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <h1 className="font-[Roboto-Bold] text-4xl text-white font-bold text-center">Checklist App</h1>
            <div className="new-checklist flex gap-x-3 p-5 justify-between">
                <input
                    className="rounded-xl py-2 w-[85%] 2xl:w-[90%] px-4 bg-blue-navy border-none placeholder:text-gray-400 text-white focus:outline-none focus:ring-0 placeholder:text-sm"
                    type="text"
                    placeholder="New Checklist Title"
                    value={newChecklistTitle}
                    onChange={(e) => setNewChecklistTitle(e.target.value)}
                    onKeyDown={(e) => handleCreateChecklistKeyDown(e)}
                />
                <button
                    className="text-white font-semibold p-3 rounded-xl cursor-pointer bg-purple-primary text-xs lg:text-base"
                    onClick={handleNewChecklist}
                >
                    Create Checklist
                </button>
            </div>
            <div className="userChecklist px-12 pt-5">
                {userChecklist.map((checklist: any, index: number) => (
                    <div className="checklist" key={index}>
                        <div className="flex flex-row justify-between border border-blue-dodger rounded-lg py-3 px-5 mb-4">
                            <div className="flex gap-x-4">
                                <div className="w-7 h-7 flex items-center justify-center border-2 rounded-lg bg-[#062A4F]">
                                    <p className="text-white text-xs">Cl</p>
                                </div>
                                <h2 className="text-white">{checklist.title}</h2>
                            </div>
                            <div className="px-2 flex gap-x-4 justify-between">
                                <button onClick={() => handleDeleteChecklist(index)}>
                                    <HiOutlineTrash color="red" />
                                </button>
                                <button>
                                    <HiOutlineChevronDown className="text-white" />
                                </button>
                            </div>
                        </div>
                        <ul className="px-5 mb-3">
                            {checklist.tasks.map((task: any, taskIndex: number) => (
                                <li key={taskIndex} className="flex justify-between">
                                    <CheckListItem
                                        task={task}
                                    />
                                    <button onClick={() => handleDeleteTask(index, taskIndex)}>
                                        <HiOutlineTrash color="red" />
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <button
                            className="flex px-5 gap-x-4 mb-8"
                            onClick={() => handleOpenTaskModal(index)}
                        >
                            <div className="w-7 h-7 flex items-center justify-center border-[#2B87E3] border-2 rounded-lg">
                                <HiPlus color="#2B87E3" />
                            </div>
                            <p className="text-[#2B87E3]">Add New Item</p>
                        </button>
                    </div>
                ))}
            </div>
            {showTaskModal && (
                <div className="px-16">
                    <div className="flex justify-between">
                        <input
                            className="border-2 border-gray-300 rounded-lg py-3 px-4 w-[85%] bg-blue-navy  border-none placeholder:text-gray-400 text-white focus:outline-none focus:ring-0 placeholder:text-sm"
                            type="text"
                            placeholder="Add Task Text"
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            onKeyDown={(e) => handleCreateTaskKeyDown(e)}
                        />
                        <div className="flex gap-x-2 px-2">
                            <button onClick={handleCreateTask}>
                                <HiPlusCircle color="#2B87E3" size={25} />
                            </button>
                            <button onClick={handleCloseTaskModal}>
                                <HiMinusCircle color="red" size={25} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(Checklist);
