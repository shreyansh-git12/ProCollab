import React, { useContext, useEffect, useState } from "react";
import AddProject from "../components/AddProject";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { LuUsers } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const VirtualHome = () => {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/project/all")
      .then((res) => {
        setProjects(res.data.projects || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="dotted-bg">
      <div className="relative px-4 py-6 md:px-12 lg:px-24 min-h-screen  darktext-white flex flex-col items-center justify-start ">
        <div className="mb-10 mt-12 bg-background">
          <h1 className="text-3xl font-bold dark:text-white">Your Projects</h1>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {projects.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full text-lg">
              No project found
            </p>
          ) : (
            projects.map((item) => (
              <Card
                key={item._id}
                onClick={() => navigate(`/project/${item._id}`)}
                className="cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="truncate text-xl">
                    {item.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <LuUsers className="text-lg" />
                    <span>{item.users?.length || 0} Collaborators</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="md:mt-20 mt-15 mb-10">
          <AddProject />
        </div>
      </div>
    </div>
  );
};

export default VirtualHome;
