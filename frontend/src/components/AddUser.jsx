import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiUserPlus } from "react-icons/fi";
import axios from "../config/axios";

const getInitial = (email) =>
  (email && email.trim().charAt(0).toUpperCase()) || "";

const AddCollaborators = ({ projectId }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [addedCollaborators, setAddedCollaborators] = useState([]);
  const [users, setUsers] = useState([]);

  const toggleSelect = (id) => {
    if (!addedCollaborators.includes(id)) {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    }
  };

  const handleAdd = () => {
    console.log("Received projectId prop:", projectId);

    if (!projectId) {
      console.error("projectId is missing");
      return;
    }

    axios
      .put("/project/add-user", {
        projectId,
        users: selectedIds,
      })
      .then((res) => {
        console.log("Collaborators added:", res.data);
        setAddedCollaborators((prev) => [...prev, ...selectedIds]);
        setSelectedIds([]);
      })
      .catch((err) => {
        console.error("Error adding collaborators:", err);
        if (err.response) {
          console.error("Backend error:", err.response.data);
        }
      });
  };

  useEffect(() => {
    axios
      .get("/user/all")
      .then((response) => {
        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          console.error("Unexpected response format:", response.data);
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  }, []);

  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex items-center gap-2 hover:text-primary">
          <FiUserPlus size={20} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Collaborators</DialogTitle>
            <DialogDescription>
              Select users to add to your project.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {users.map((user) => {
              if (!user || !user._id || !user.email) return null;

              const isSelected = selectedIds.includes(user._id);
              const isAdded = addedCollaborators.includes(user._id);

              return (
                <div
                  key={user._id}
                  onClick={() => toggleSelect(user._id)}
                  className={`flex items-center gap-4 p-2 rounded border cursor-pointer transition ${
                    isAdded
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : isSelected
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {getInitial(user.email)}
                  </div>
                  <div>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            onClick={handleAdd}
            disabled={selectedIds.length === 0}
            className="mt-4"
          >
            Add Collaborators
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCollaborators;
